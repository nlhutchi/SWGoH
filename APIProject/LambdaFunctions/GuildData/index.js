const AWS = require("aws-sdk");
const endpointMapping = require("./endpointMapping.json");
const { uuid } = require('uuidv4');

var documentClient = new AWS.DynamoDB.DocumentClient();

var returnObj = {
    statusCode: null,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: null,
};



exports.handler = async (event, context, callback) => {
    console.log('Event', event);

    try {
        switch (event.httpMethod) {
            case "GET": 
                switch (event.path) {
                    case endpointMapping.GET.GuildData.path:
                        console.log("Endpoint: ", endpointMapping.GET.GuildData.description);
                        await getGuildData();
                        return callback(null, returnObj);
                    case endpointMapping.GET.TWData.path:
                        console.log("Endpoint: ", endpointMapping.GET.TWData.description);
                        await getTWData();
                        return callback(null, returnObj);
                    default:
                        returnObj.body = "Path not found";
                        returnObj.statusCode = 404;
                        return callback(null, returnObj);
                }
            case "GET": 
                switch (event.path) {
                    case endpointMapping.POST.TWData.path:
                        var { guildId } = JSON.parse(event.body)
                        console.log("Endpoint: ", endpointMapping.POST.TWData.description);
                        //await postTWData(guildId, []);
                        return callback(null, returnObj);
                    default:
                        returnObj.body = "Path not found";
                        returnObj.statusCode = 404;
                        return callback(null, returnObj);
                }
            default:
                returnObj.body = "Method Not Allowed";
                returnObj.statusCode = 405;
                return callback(null, returnObj);
        }

    } catch (err) {
        console.log("ERROR: ", err);
        returnObj.statusCode = 500;
        returnObj.body = JSON.stringify(err);
        return callback(null, returnObj);
    }
};

async function getGuildData() {
    var params = {
        TableName: process.env.GuildMemberTable,
    };

    await documentClient.scan(params).promise()
        .then((response) => {
            console.log("Success", response);
            returnObj.body = JSON.stringify({ guildMembers: response.Items });
            returnObj.statusCode = 200;
        })
        .catch((err) => {
            console.log("Error", err);
            returnObj.body = JSON.stringify({ message: 'failed', details: err });
            returnObj.statusCode = 400;
        });
}


async function getTWData() {
    try {
        let guildMembers = await documentClient.scan({
            TableName: process.env.GuildMemberTable,
        }).promise()
            .then((response) => {
                console.log("Success", response);
                return response.Items 
            });
        console.log("guildMembers", guildMembers);

        let twData = await documentClient.scan({
            TableName: process.env.SWGoHTWParticipationTable,
        }).promise()
            .then((response) => {
                console.log("Success", response);
                return response.Items;
            });
        console.log("twData", twData);
    } catch(err) {
        console.log("Error", err);
        returnObj.body = JSON.stringify({ message: 'failed', details: err });
        returnObj.statusCode = 400;
    }
}

const postTWData = async  (guildId, twData) => {
    if(twData.length > 25) {
        await postTWData(guildId, twData.slice(0, 24));
        await postTWData(guildId, twData.slice(24, twData.length));
    } else {
        console.log('twData', twData)
        var tableArray = twData.map((row) => {
            return {
                PutRequest: {
                    Item: {
                        twRecordUUID: uuid(),
                        twParticipationSearchIndex: `${guildId}#${row.currentRoundEndTime}#${row.allyCode}`,
                        name: row.name.galactic_power,
                        allyCode: row.allyCode,
                        currentRoundEndTime: row.currentRoundEndTime,
                        instance: row.instance,
                        defensiveBanners: row.defensiveBanners,
                        offensiveBanners: row.offensiveBanners,
                        totalBanners: row.totalBanners,
                    }
                }
            }
        });

        
        var params = {
            RequestItems: {
                [process.env.SWGoHTWParticipationTable]: tableArray
            }
        };
      
        await documentClient.batchWrite(params).promise()
            .then((response) => {
                console.log('response', response);
            }).catch((err) => {
                console.log('err', err);
            });
    }
}
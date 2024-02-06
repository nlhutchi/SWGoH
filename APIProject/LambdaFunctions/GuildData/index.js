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
            case "POST": 
                switch (event.path) {
                    case endpointMapping.POST.TWData.path:
                        var guildId = event.queryStringParameters.guildId
                        var twData = reduceTWData(guildId, event.body.split(/\r?\n/));
                        console.log("twData: ", twData.length);
                        console.log("twData: ", twData);
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

const reduceTWData = (guildId, twArray) => {
    let firstRow = twArray[0].split(',');
    let reducedObject = {};
    let objectifiedArray = twArray.slice(1, twArray.length).map((row) => {
        let returnObj = {};
        firstRow.forEach((val, index) => {
            returnObj[val] = row[index];
        });
        return returnObj;
    });

    console.log("objectifiedArray", objectifiedArray);
    objectifiedArray.forEach(element => {
        if(reducedObject[`${guildId}#${element.currentRoundEndTime}#${element.allyCode}`]) {
            reducedObject[`${guildId}#${element.currentRoundEndTime}#${element.allyCode}`][element.MapStatId] = element.Score
        } else {
            reducedObject[`${guildId}#${element.currentRoundEndTime}#${element.allyCode}`] = {
                twParticipationSearchIndex: `${guildId}#${element.currentRoundEndTime}#${element.allyCode}`,
                ...element,
                [element.MapStatId]: element.Score
            }
        }
    });
    console.log("reducedObject", reducedObject);

    return Object.values(reducedObject);
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
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
                        var {twData, TWColumns} = reduceTWData(guildId, event.body.split(/\r?\n/));
                        console.log("twData: ", twData.length);
                        console.log("twData: ", twData);
                        console.log("TWColumns: ", TWColumns);
                        console.log("Endpoint: ", endpointMapping.POST.TWData.description);
                        await postTWData(guildId, twData);
                        await postTWAssets(TWColumns);
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
                returnObj.body = JSON.stringify({ twData: response.Items });
                returnObj.statusCode = 200;
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
    let TWColumns = {};
    let objectifiedArray = twArray.slice(1, twArray.length).map((row) => {
        let splitRow = row.split(',');
        let returnObj = {};
        firstRow.forEach((val, index) => {
            returnObj[val] = splitRow[index];
        });
        return returnObj;
    });

    console.log("objectifiedArray", objectifiedArray);
    objectifiedArray.forEach(element => {
        //columns
        if(!TWColumns[element.CurrentRoundEndTime]) {
            TWColumns[element.CurrentRoundEndTime] = {
                currentRoundEndTime: element.CurrentRoundEndTime,
                opponent: element.Instance,
            }
        }

        //rows
        if(reducedObject[`${guildId}#${element.CurrentRoundEndTime}#${element.AllyCode}`]) {
            reducedObject[`${guildId}#${element.CurrentRoundEndTime}#${element.AllyCode}`][element.MapStatId] = element.Score
        } else {
            reducedObject[`${guildId}#${element.CurrentRoundEndTime}#${element.AllyCode}`] = {
                twParticipationSearchIndex: `${guildId}#${element.CurrentRoundEndTime}#${element.AllyCode}`,
                ...element,
                [element.MapStatId]: element.Score
            }
        }
    });
    console.log("reducedObject", reducedObject);
    console.log("TWColumns", TWColumns);

    return { twData: Object.values(reducedObject), TWColumns };
}

const postTWAssets = async (TWColumns) => {

}

const postTWData = async  (guildId, twData) => {
    if(twData.length > 25) {
        await postTWData(guildId, twData.slice(0, 24));
        await postTWData(guildId, twData.slice(24, twData.length));
    } else {
        console.log('twData', twData)
        var tableArray = twData.map((row) => {
            return {
                Update: {
                    Item: {
                        TableName: process.env.GuildMemberTable,
                        Key: { allyCode: row.AllyCode },
                        UpdateExpression: `set #a = ${{
                            name: row.Name,
                            discordTag: row.DiscordTag,
                            allyCode: row.AllyCode,
                            currentRoundEndTime: row.CurrentRoundEndTime,
                            instance: row.Instance,
                            defensiveBanners: row.set_defense_stars,
                            offensiveBanners: row.attack_stars,
                            totalBanners: row.stars,
                            disobey: row.disobey
                        }}`,
                        ExpressionAttributeNames: {'#a' : 'twHistory'},
                        ExpressionAttributeValues: {
                          ':x' : 20,
                          ':y' : 45,
                          ':MAX' : 100,
                        }
                        // twRecordUUID: uuid(),
                        // twParticipationSearchIndex: `${guildId}#${row.CurrentRoundEndTime}#${row.AllyCode}`,
                        // name: row.Name,
                        // discordTag: row.DiscordTag,
                        // allyCode: row.AllyCode,
                        // currentRoundEndTime: row.CurrentRoundEndTime,
                        // instance: row.Instance,
                        // defensiveBanners: row.set_defense_stars,
                        // offensiveBanners: row.attack_stars,
                        // totalBanners: row.stars,
                        // disobey: row.disobey,
                    }
                }
            }
        });
        console.log('tableArray', JSON.stringify(tableArray))

        
        var params = {
            TransactItems: tableArray
        };
      
        await documentClient.transactWrite(params).promise()
            .then((response) => {
                console.log('response', response);
                returnObj.body = JSON.stringify({ ...response });
                returnObj.statusCode = 200;
            }).catch((err) => {
                console.log('err', err);
            });
    }
}
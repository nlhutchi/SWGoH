const AWS = require("aws-sdk");
const endpointMapping = require("./endpointMapping.json");

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
    await documentClient.scan().promise()
        .then((response) => {
            console.log("Success", response);
            returnObj.body = JSON.stringify({ guildMembers: response });
            returnObj.statusCode = 200;
        })
        .catch((err) => {
            console.log("Error", err);
            returnObj.body = JSON.stringify({ message: 'failed', details: err });
            returnObj.statusCode = 400;
        })
    // await axiosInstance.get(`http://api.swgoh.gg/guild-profile/${guildId}/`)
    //     .then((data) => {
    //         console.log("Success", data);
    //         returnObj.body = JSON.stringify({ ...data.data });
    //         returnObj.statusCode = 200;
    //     })
    //     .catch((err) => {
    //         console.log("Error", err);
    //         returnObj.body = JSON.stringify({ message: 'failed', details: err });
    //         returnObj.statusCode = 400;
    //     });
}

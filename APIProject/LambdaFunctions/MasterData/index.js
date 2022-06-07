const { createAxiosInstance } = require("/opt/nodejs/axiosUtilities.js");
const endpointMapping = require("./endpointMapping.json");
var axiosInstance;

var returnObj = {
    statusCode: null,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: null,
};

exports.handler = async (event, context, callback) => {
    if(!axiosInstance) {
        axiosInstance = createAxiosInstance();
    }

    try {
        switch (event.httpMethod) {
            case "GET": 
                switch (event.path) {
                    case endpointMapping.GET.CharacterData.path:
                        console.log("Endpoint: ", endpointMapping.GET.CharacterData.description);
                        await getCharacterDataGG();
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
}

async function getCharacterDataGG() {
    console.log('getGuildDataGG')
    await axiosInstance.get(`http://api.swgoh.gg/characters/`)
        .then((data) => {
            console.log("Success", data);
            returnObj.body = JSON.stringify({ ...data.data });
            returnObj.statusCode = 200;
        })
        .catch((err) => {
            console.log("Error", err);
            returnObj.body = JSON.stringify({ message: 'failed', details: err });
            returnObj.statusCode = 400;
        });
}
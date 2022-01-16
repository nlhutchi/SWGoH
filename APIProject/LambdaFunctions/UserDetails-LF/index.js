const AWS = require("aws-sdk");
const axios = require('axios');
const endpointMapping = require("./endpointMapping.json");
var axiosInstance;

var returnObj = {
    statusCode: null,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: null,
};



exports.handler = async (event, context, callback) => {
    console.log('Event', event);
    if(!axiosInstance) {
        axiosInstance = createAxiosInstance(event.headers.Authorization);
    }
    var body = event.body;
    console.log('body', body)
    console.log(typeof body)

    try {
        switch (event.httpMethod) {
            case "GET": 
                switch (event.path) {
                    case endpointMapping.GET.Players.path:
                        console.log("Endpoint: ", endpointMapping.GET.Players.description);
                        await getPlayers(body);
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

async function getPlayers(body) {
    await axiosInstance.post('https://api.swgoh.help/swgoh/players', { allyCodes: body.allyCodes })
        .then((data) => {
            console.log("Success", data);
            returnObj.body = JSON.stringify({ ...data.data });
            returnObj.statusCode = 200;
        })
        .catch((err) => {
            console.log("Error", err);
            returnObj.body = JSON.stringify({ message: 'failed', details: err });
            returnObj.statusCode = 400;
        })
}

function createAxiosInstance(auth) {
    return axios.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth,
        },
    });
}

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
        axiosInstance = createAxiosInstance();
    }
    var body = event.body;

    try {
        switch (event.httpMethod) {
            case "GET": 
                switch (event.resource) {
                    case endpointMapping.GET.GuildData.path:
                        console.log("Endpoint: ", endpointMapping.GET.GuildData.description);
                        await getGuildDataGG(event.path.split("/")[2]);
                        return callback(null, returnObj);
                    case endpointMapping.GET.MemberData.path:
                        console.log("Endpoint: ", endpointMapping.GET.MemberData.description);
                        await getMemberDataGG(event.path.split("/")[2]);
                        return callback(null, returnObj);
                    default:
                        returnObj.body = "Path not found";
                        returnObj.statusCode = 404;
                        return callback(null, returnObj);
                }
            case "POST": 
                switch (event.path) {
                    case endpointMapping.POST.GuildData.path:
                        console.log("Endpoint: ", endpointMapping.POST.GuildData.description);
                        await getGuildDataGG(body.guildId);
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

async function getGuildData(body) {
    await axiosInstance.post('https://api.swgoh.help/swgoh/guilds', { allycodes: body.allyCodes })
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

async function getMemberDataGG(guildId) {
    console.log('getMemberDataGG')
    await axiosInstance.get(`http://api.swgoh.gg/player/${allyCode}/`)
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

async function getGuildDataGG(guildId) {
    console.log('getGuildDataGG')
    await axiosInstance.get(`http://api.swgoh.gg/guild-profile/${guildId}/`)
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


function createAxiosInstance() {
    return axios.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
}

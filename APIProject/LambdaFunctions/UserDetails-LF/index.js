const AWS = require("aws-sdk");
const axios = require('axios');
const endpointMapping = require("./endpointMapping.json");

var returnObj = {
    statusCode: null,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: null,
};



exports.handler = async (event, context, callback) => {
    console.log('Event', event);
    var axiosInstance = createAxiosInstance(event.headers.Authorization);
    var body = event.body;

    try {
        switch (event.httpMethod) {
            case "PUT": 
                switch (event.path) {
                    case endpointMapping.PUT.Players.path:
                        console.log("Endpoint:", endpointMapping.PUT.Players.description);
                        await getPlayers(body, axiosInstance);
                        return callback(null, returnObj);
                    default:
                        returnObj.body = "Path not found";
                        returnObj.statusCode = 404;
                        return callback(null, returnObj);
                }
            case "POST":
                switch (event.path) {
                  case endpointMapping.POST.SignIn.path:
                    console.log("Endpoint:", endpointMapping.POST.SignIn.description);
                    await signInUser();
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

async function signInUser() {
    var params = { 
        username: 'thehutch69', 
        password: 'Bandit', 
        grant_type: 'password',
        client_id: 'abc',
        client_secret: '123'
    };
    var data = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
    console.log('data', data)
    await axiosInstance.post('https://api.swgoh.help/auth/signin', Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&'))
        .then((data) => {
            console.log("Success", data);
            returnObj.body = JSON.stringify({ ...data.data });
            returnObj.statusCode = 200;
        })
        .catch((err) => {
            console.log("Error", err);
            returnObj.body = JSON.stringify({ message: 'denied', details: err });
            returnObj.statusCode = 400;
        });
}

async function signInUser(body, axiosInstance) {
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
    if(auth === undefined){
        return axios.create({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });
    } else {
        return axios.create({
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth,
          },
        });
    }
  }
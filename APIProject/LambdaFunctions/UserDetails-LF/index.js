const AWS = require("aws-sdk");
const axios = require('axios');
const endpointMapping = require("./endpointMapping.json");

var returnObj = {
    statusCode: null,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: null,
};

const axiosInstance = axios.create({
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
    });

exports.handler = async (event, context, callback) => {
    console.log('Event', event)
    var body = event.body;

    try {
        switch (event.httpMethod) {
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
        errorObj.body = JSON.stringify(err);
        return callback(null, errorObj);
    }
};

async function signInUser() {
    await axiosInstance.post('https://api.swgoh.help/auth/signin', { 
        username: 'thehutch69', 
        password: 'Bandit', 
        grant_type: 'password',
        client_id: 'abc',
        client_secret: 123
    })
        .then((data) => {
            returnObj.body = { authToken: data }
            returnObj.statusCode = 200
        })
        .error((err) => {
            returnObj.body = { message: 'denied' }
            returnObj.statusCode = 400
        })
}

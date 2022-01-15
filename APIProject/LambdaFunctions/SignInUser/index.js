const axios = require('axios');
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
  
    try {
        await signInUser();
        return callback(null, returnObj);
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

function createAxiosInstance(auth) {
    return axios.create({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    });
}

const AWS = require("aws-sdk");
const axios = require('axios');

var documentClient = new AWS.DynamoDB.DocumentClient();

var axiosInstance;

const createAxiosInstance = () => {
    return axios.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
}

var returnObj = {
    statusCode: null,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: null,
};



exports.handler = async (event, context, callback) => {
    console.log('Event', event);

    try {
        if(!axiosInstance) {
            axiosInstance = createAxiosInstance();
        }
        const response = await axiosInstance.get(`"https://swgoh.gg/g/jrl9Q-_CRDGdMyNjTQH1rQ/raid-history/"`)
            .then((response) => {
                console.log("Success", response);
                console.log("Success 2", response.data.data);
                return response.data.data;
            })
        const raids = await response.json();
        console.log("raids", raids)
        parseRaids(raids)
    } catch (err) {
        console.log("ERROR: ", err);
        returnObj.statusCode = 500;
        returnObj.body = JSON.stringify(err);
        return callback(null, returnObj);
    }
};

const parseRaids = (raids) => {

}

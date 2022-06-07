const axios = require('axios');

exports.createAxiosInstance = () => {
    return axios.create({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
}
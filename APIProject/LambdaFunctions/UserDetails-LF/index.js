const AWS = require("aws-sdk");
var returnObj = {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: "Success",
};

exports.handler = async (event, context, callback) => {
    console.log('Event', event)
    return callback(null, returnObj);
};
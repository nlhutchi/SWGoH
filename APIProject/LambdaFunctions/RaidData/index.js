const AWS = require("aws-sdk");
const axios = require('axios');
const jsdom = require("jsdom");

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
        const response = await axiosInstance.get(`https://swgoh.gg/g/jrl9Q-_CRDGdMyNjTQH1rQ/raid-history/`)
            .then((response) => {
                console.log("Success", response);
                console.log("Success 2", response.data);
                return response.data;
            })
        console.log("response", response)
        parseRaids(response)
    } catch (err) {
        console.log("ERROR: ", err);
        returnObj.statusCode = 500;
        returnObj.body = JSON.stringify(err);
        return callback(null, returnObj);
    }
};

const parseRaids = (raids) => {
    // var raidTable = document.createElement( 'html' );
    // raidTable.innerHTML = raids;
    // raidTable.getElementsByTagName( 'table' )
    // const parser = new DOMParser();
    let raidsPerformed = [];
    const $ = cheerio.load(raids);
    const raidsList = $("table");
    raidsList.each(() => {
        console.log("$(this)", $(this))
        let raidLink = $(this).find("a").href()
        let raidDate = $(this).find("td:last").text()
        raidsPerformed.push({
            raidLink,
            raidDate
        })
    })
    console.log("raidsPerformed", raidsPerformed);
}

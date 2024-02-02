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

exports.handler = async (event, context, callback) => {
    if(!axiosInstance) {
        axiosInstance = createAxiosInstance();
    }

    var guildMembers = await getGuildMembers();
    console.log('guildMembers', guildMembers)
    //await insertMembersToDB(process.env.GuildMemberTable, guildMembers);

    return callback(null, returnObj);
                
}

async function getGuildMembers(guildId) {
    console.log('getGuildDataGG')
    var guildMembers;

    await axiosInstance.get(`http://api.swgoh.gg/guild-profile/${guildId}/`)
        .then((data) => {
            console.log("Success", data);
            guildMembers = data.data;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    
    return guildMembers;
}


const insertMembersToDB = async (guildMemberTable, guildMembers) => {
    console.log('guildMembers', guildMembers)
    var tableArray = guildMembers.map((member) => {
        return {
            PutRequest: {
              Item: {
                allyCode: member.allyCode,
                name: member.name,
                gp: member.GP
              }
            }
          }
    })

    console.log("tableArray", tableArray);

    var params = {
        RequestItems: {
          [guildMemberTable]: tableArray
        }
      };
      
      await documentClient.batchWrite(params).promise()
        .then((response) => {
            console.log('response', response);
        }).catch((err) => {
            console.log('err', err);
        })
}
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

    var guildInfo = await getGuildMembers(process.env.GuildId);
    console.log('guildInfo', guildInfo)
    await insertMembersToDB(process.env.GuildMemberTable, guildInfo.members, guildInfo.guildId);

    return callback(null, guildInfo);
                
}

async function getGuildMembers(guildId) {
    console.log('getGuildDataGG')
    var guildMembers;

    await axiosInstance.get(`http://api.swgoh.gg/guild-profile/${guildId}/`)
        .then((response) => {
            console.log("Success", response);
            guildMembers = response.data.data;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    
    return guildMembers;
}


const insertMembersToDB = async (guildMemberTable, guildMembers, guildId) => {
    console.log('guildMembers', guildMembers)
    var tableArray = guildMembers.map((member) => {
        return {
            PutRequest: {
              Item: {
                allyCode: member.ally_code,
                name: member.player_name,
                gp: member.galactic_power,
                guildId: guildId,
                image: member.portrait_image
              }
            }
          }
    })

    console.log("tableArray", JSON.stringify(tableArray));

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
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
    await insertGuildToDB(process.env.GuildsTable, guildInfo);
    await insertMembersToDB(process.env.GuildMemberTable, guildInfo.members, guildInfo.guild_id);

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

const insertGuildToDB = async (guildsTable, guildInfo) => {
    var params = {
        TableName: guildsTable,
        Key: { guildId : guildInfo.guild_id },
        UpdateExpression: 'set #lastUpdated = :updatedTime, #gp = :gp, #members = :members, #name = :name',
        ExpressionAttributeNames: {
            '#lastUpdated' : 'lastUpdated',
            '#gp' : 'gp',
            '#members' : 'members',
            '#name' : 'name'
        },
        ExpressionAttributeValues: {
          ':updatedTime' : new Date().toISOString(),
          ':gp' : guildInfo.galactic_power,
          ':members' : guildInfo.member_count,
          ':name' : guildInfo.name,
        }
    };
      
    await documentClient.update(params).promise()
        .then((response) => {
            console.log('response', response);
        }).catch((err) => {
            console.log('err', err);
        })
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
    
    if(tableArray.length > 25) {
        await uploadToTable(guildMemberTable, tableArray.slice(0, 24))
        await uploadToTable(guildMemberTable, tableArray.slice(24, tableArray.length))
        
    } else {
        await uploadToTable(guildMemberTable, tableArray)
    }
}

const uploadToTable = async (guildMemberTable, items) => {
    var params = {
        RequestItems: {
          [guildMemberTable]: items
        }
      };
      
      await documentClient.batchWrite(params).promise()
        .then((response) => {
            console.log('response', response);
        }).catch((err) => {
            console.log('err', err);
        })
}
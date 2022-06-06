import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Select from 'react-select';
import useToken from '../components/useToken';
import APIEndPoints from '../services/api';
import GuildMembers from '../components/GuildMembers';
import { setGuildMasterData } from '../actions/GuildDataActions';
import { setMemberData } from '../actions/MemberDataActions';

const guilds = [
    {
        label: 'Men',
        value: 'RE3k7ZxtQ9-x9VArJItrzQ'
    },
    {
        lebel: 'Crew',
        value: 'I0nWk1NURYeBMypWqPVIQw'
    }
];

const useStyles = makeStyles({
    guildTitle: {

    }
});

function GuildPage(props) {
    const { token, setToken } = useToken();
    const [ selectedGuild, setSelectedGuild] = useState(guilds[0]);
    const classes = useStyles();
    var { guildMasterData } = props;

    useEffect(async () => {
        for(const guild of guilds) {
            await axios({
                method: 'get',
                url: APIEndPoints.GUILD_DATA(guild.value)
            })
                .then((response) => {
                    console.log('data', response.data);
                    props.setGuildMasterData(response.data.data);
                });
        }
    }, []);

    useEffect(() => {
        if(guildMasterData) {
            var promiseArray = [];
            guildMasterData[selectedGuild.value].members.forEach(member => {
                promiseArray.push(
                    axios({
                        method: 'get',
                        url: APIEndPoints.MEMBER_DATA(member.ally_code)
                    })
                        .then((response) => {
                            console.log('data', response.data);
                            //props.setMemberData(response.data);
                            return response.data;
                        })
                        .catch((err) => {
                            console.log('Failed for member:', member)
                        })
                );
            });
            Promise.all(promiseArray).then((responses) => {
                console.log(responses);
                props.setMemberData(responses);
            });
        }
    }, [guildMasterData, selectedGuild])
  
    return (
        <div>
            <Select 
                options={guilds}
                value={selectedGuild}
                onChange={(e) => {setSelectedGuild(e)}}
            />
            <GuildMembers selectedGuild={selectedGuild.value}/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        guildMasterData: state.GuildDataReducer.guildMasterData
    };
}

const mapDispatchToProps = (dispatch) => ({
    setGuildMasterData: (guildMasterData) => dispatch(setGuildMasterData(guildMasterData)),
    setMemberData: (allyCode, memberData) => dispatch(setMemberData(allyCode, memberData))
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildPage);
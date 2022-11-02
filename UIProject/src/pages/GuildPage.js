import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { makeStyles } from '@mui/styles';
import Select from 'react-select';
// import useToken from '../components/useToken';
import APIEndPoints from '../services/api';
import GuildMembers from '../components/GuildMembers';
import GuildBanner from '../components/GuildBanner';
import { setGuildMasterData } from '../actions/GuildDataActions';
import { setMemberData } from '../actions/MemberDataActions';

const guilds = [
    {
        label: 'Koolaid Men',
        value: 'RE3k7ZxtQ9-x9VArJItrzQ'
    },
    {
        label: 'Koolaid Crew',
        value: 'I0nWk1NURYeBMypWqPVIQw'
    },
    {
        label: 'Anarchy Empire',
        value: '8YJPkrmiT4OAbxpqmYd3PA'
    }
];

// const useStyles = makeStyles({
//     guildTitle: {

//     }
// });

function GuildPage(props) {
    // const { token, setToken } = useToken();
    const [ selectedGuild, setSelectedGuild] = useState(guilds[0]);
    // const classes = useStyles();
    var { guildMasterData } = props;

    useEffect(async () => {
        for(const guild of guilds) {
            await axios({
                method: 'get',
                url: APIEndPoints.GUILD_DATA(guild.value)
            })
                .then((response) => {
                    props.setGuildMasterData(response.data.data);
                });
        }
    }, []);

    useEffect(() => {
        if(guildMasterData && !props.memberData[selectedGuild.value]) {
            var promiseArray = [];
            guildMasterData[selectedGuild.value].members.forEach(member => {
                promiseArray.push(
                    axios({
                        method: 'get',
                        url: APIEndPoints.MEMBER_DATA(member.ally_code)
                    })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((err) => {
                            console.log('Failed for member:', member)
                        })
                );
            });
            Promise.all(promiseArray).then((responses) => {
                props.setMemberData(selectedGuild.value, responses);
            });
        }
    }, [guildMasterData, selectedGuild])
  
    return (
        <div>
            <GuildBanner 
                guildIcon={props.guildMasterData && props.guildMasterData[selectedGuild.value].banner_logo_id}
                guildId={selectedGuild.value}
                GP={props.guildMasterData && props.guildMasterData[selectedGuild.value].galactic_power}
                members={props.guildMasterData && props.guildMasterData[selectedGuild.value].member_count}
            >
                <Select 
                    options={guilds}
                    value={selectedGuild}
                    onChange={(e) => {setSelectedGuild(e)}}
                />
            </GuildBanner>
            <GuildMembers key={`${selectedGuild.value}-members`} selectedGuild={selectedGuild.value}/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        guildMasterData: state.GuildDataReducer.guildMasterData,
        memberData: state.MemberDataReducer.memberData
    };
}

const mapDispatchToProps = (dispatch) => ({
    setGuildMasterData: (guildMasterData) => dispatch(setGuildMasterData(guildMasterData)),
    setMemberData: (allyCode, memberData) => dispatch(setMemberData(allyCode, memberData))
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildPage);
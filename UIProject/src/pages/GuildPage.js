import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import useToken from '../components/useToken';
import APIEndPoints from '../services/api';
import GuildMembers from '../components/GuildMembers';
import { setGuildMasterData } from '../actions/GuildDataActions';
import { setMemberData } from '../actions/MemberDataActions';

const useStyles = makeStyles({
    guildTitle: {

    }
});

function GuildPage(props) {
    const { token, setToken } = useToken();
    const classes = useStyles();
    var { guildMasterData } = props;

    useEffect(async () => {
        await axios({
            method: 'get',
            url: APIEndPoints.GUILD_DATA("RE3k7ZxtQ9-x9VArJItrzQ")
        })
            .then((response) => {
                console.log('data', response.data);
                props.setGuildMasterData(response.data.data);
            });
    }, []);

    useEffect(() => {
        if(guildMasterData) {
            guildMasterData.members.forEach(member => {
                axios({
                    method: 'get',
                    url: APIEndPoints.MEMBER_DATA(member.ally_code)
                })
                    .then((response) => {
                        console.log('data', response.data);
                        props.setMemberData(response.data.data);
                    });
            });
        }
    }, [guildMasterData])
  
    return (
        <div>
            <div className={classes.guildTitle}>{guildMasterData ? guildMasterData.name : '' }</div>
            <GuildMembers/>
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
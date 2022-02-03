import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import useToken from '../components/useToken';
import APIEndPoints from '../services/api';
import GuildMembers from '../components/GuildMembers';
import { setGuildMasterData } from '../actions/GuildDataActions';

const useStyles = makeStyles({
    guildTitle: {

    }
});

function GuildPage(props) {
    const { token, setToken } = useToken();
    const classes = useStyles();

    useEffect(async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios({
            method: 'post',
            url: APIEndPoints.GUILD_DATA,
            data: {
                "allyCodes": [
                    "315779484"
                ]
            }
        })
            .then((response) => {
                console.log('data', response.data);
                props.setGuildMasterData(response.data[0]);
            });
    }, []);
  
    return (
        <div>
            <div className={classes.guildTitle}>Koolaid Men</div>
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
    setGuildMasterData: (guildMasterData) => dispatch(setGuildMasterData(guildMasterData))
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildPage);
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import useToken from '../components/useToken';
import APIEndPoints from '../services/api';

function GuildData() {
    const { token, setToken } = useToken();

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
            .then((data) => {
                console.log('data', data)
            });
    }, []);
  
    return (
        <div>
            <p>Guild Data</p>
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildData);
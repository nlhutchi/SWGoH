import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCharacterMasterData, setGLMasterData } from '../actions/MasterDataActions'
import axios from 'axios';
import APIEndPoints from '../services/api';

function InitializeData(props) {
    const navigate = useNavigate();
    const masterDataCalls = [
        {
            endpoint:APIEndPoints.CHARACTER_DATA,
            callBack: props.setCharacterMasterData
        },
        {
            endpoint: APIEndPoints.GL_REQ_DATA,
            callBack: props.setGLMasterData
        }
    ];

    useEffect(async () => {
        await getAllData();
        navigate('/Guild')
    }, []);

    const getAllData = async () => {
        var promiseArray = [];
        masterDataCalls.forEach((call) => {
            debugger
            promiseArray.push(
                axios({
                    method: 'get',
                    url: call.endpoint
                })
                    .then((response) => {
                        console.log(call.endpoint);
                        call.callBack(response.data);
                    })
                    .catch((error) => {
                        console.log(call.endpoint);
                        console.log('MDError', error)
                    })
            );
        })
        await Promise.all(promiseArray);
    }

    return (
        <div>
            {/* <p>Initializing Data</p> */}
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
    setCharacterMasterData: (characterData) => dispatch(setCharacterMasterData(characterData))
});

export default connect(mapStateToProps, mapDispatchToProps)(InitializeData);
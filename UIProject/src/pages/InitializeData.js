import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCharacterMasterData } from '../actions/MasterDataActions'
import axios from 'axios';
import APIEndPoints from '../services/api';

function InitializeData(props) {
    const navigate = useNavigate();

    useEffect(async () => {
        await getCharacterData();
        navigate('/Guild')
    }, []);

    const getCharacterData = async () => {
        await axios({
            method: 'get',
            url: APIEndPoints.CHARACTER_DATA
        })
            .then((response) => {
                console.log(response.data)
                props.setCharacterMasterData(response.data);
            });
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
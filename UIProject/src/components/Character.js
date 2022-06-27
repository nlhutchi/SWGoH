import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    characterImg: {
        borderRadius: 100
    },
    g13FrameDark: {
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: 2,
        left: '50%',
        top: '50%',
    },
    g13FrameLight: {
        backgroundImage: 'url(https://assets.swgoh.gg/files/assets/character-frame-relic-atlas.0b9ffa6122f58395.png)',
        zIndex: 1,
        left: '50%',
        top: '50%',
    }
});

function Character(props) {
    const classes = useStyles();
    console.log('unit', props.unit);
    return (
        <div className={`${classes.g13FrameDark}`}>
            <img
                className={`${classes.characterImg}`} 
                src={props.characterData[props.unit.base_id].image} 
                alt={props.unit.base_id}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        characterData: state.MasterDataReducer.characterData,
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Character);
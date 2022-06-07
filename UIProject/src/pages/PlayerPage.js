import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    wrapper: {
    }
});

function PlayerPage(props) {
    const classes = useStyles();
    const { allyCode } = useParams();

    console.log(props.memberData)
    return (
        <div className={`col-xs-4 ${classes.wrapper}`}>
            <p>{JSON.stringify(props.memberData[allyCode])}</p>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        memberData: state.MemberDataReducer.memberData
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
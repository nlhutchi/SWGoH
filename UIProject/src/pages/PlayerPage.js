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

    return (
        <Button className={`col-xs-4 ${classes.wrapper}`}>
            <p>{allyCode}</p>
        </Button>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
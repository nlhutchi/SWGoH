import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const useStyles = makeStyles({
    wrapper: {
        margin: '10px 0'
    },
    button: {
        flexDirection: 'column',
        width: '100%'
    }
});

function MemberCard(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <div className={`col-xs-4 ${classes.wrapper}`}>
            <Button 
                variant="outlined"
                className={`${classes.button}`}
                onClick={() => navigate(`/Player/${props.allyCode}`)}
            >
                <div className={classes.title}>{props.memberName}</div>
                <div className={classes.body}>
                    <div>
                        GP: {props.gp}
                    </div>
                    <div className={classes.ships}>
                        Character GP: {props.gpChar}
                    </div>
                    <div className={classes.character}>
                        Ship GP: {props.gpShip}
                    </div>
                </div>
            </Button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberCard);
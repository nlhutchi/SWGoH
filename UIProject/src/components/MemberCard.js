import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    wrapper: {
        flex: 1
    }
});

function MemberCard(props) {
    const classes = useStyles();

    return (
        <div className={`col-xs-4 ${classes.wrapper}`}>
            <p>{props.memberName}</p>
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
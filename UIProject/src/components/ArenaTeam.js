import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    
});

function ArenaTeam(props) {
    const classes = useStyles();

    return (
        <div>
            Arena Team
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ArenaTeam);
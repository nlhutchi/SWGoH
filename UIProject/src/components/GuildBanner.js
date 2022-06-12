import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    wrapper: {
        margin: 10
    }
});

function GuildBanner(props) {
    const classes = useStyles();

    return (
        <div>
            {/* <img src={`https://swgoh.gg/static/img/assets/tex.${props.guildIcon}.png`} alt={props.guildIcon}/> */}
            <div>
                {props.children}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildBanner);
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ArenaTeam from './ArenaTeam';

const useStyles = makeStyles({
    wrapper: {
        margin: '10px 0'
    },
    button: {
        flexDirection: 'column',
        width: '100%'
    },
    userImg: {
        position: 'absolute'
    },
    rankingWrappers: {
        display: 'flex',
        flexDirection: 'vertical'
    },
    leagueImg: {
        display: 'flex',
        flex: 1,
        width: '30%'
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
                onClick={() => navigate(`/Player/${props.guildId}/${props.allyCode}/`)}
            >
                <div>
                    <div>
                        <img className={classes.userImg} src={props.userFrame} />
                        <img className={classes.UserImg} src={props.userImg} />
                    </div>
                    <div className={classes.title}>{props.memberName}</div>
                </div>
                <div className={classes.body}>
                    <div>
                        GP: {props.gp}
                    </div>
                    <div className={classes.rankingWrappers}>
                        <div className={classes.leagueImg} >
                            <ArenaTeam />
                        </div>
                        <img className={classes.leagueImg} src={``} alt={props.league} />
                        <Tooltip title={props.league}>
                            <img className={classes.leagueImg} src={`https://game-assets.swgoh.gg/tex.league_icon_${props.league.toLowerCase()}_blank.png`} alt={props.league} />
                        </Tooltip>
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
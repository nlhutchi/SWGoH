import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

const useStyles = makeStyles({
    wrapper: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    columns: {
        margin: 10,
        flex: 1
    },
    actionRows: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    dataRow: {
        margin: '10px 0 !important'
    },
    guildData: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    guildImage: {
        margin: 'auto'
    },
    button: {
        margin: '10px 0 !important'
    }
});

function GuildBanner(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <div className={classes.wrapper}>
            <div className={classes.columns}>
                <img className={classes.guildImage} src={`https://swgoh.gg/static/img/assets/tex.${props.guildIcon}.png`} alt={props.guildIcon}/>
            </div>
            <div className={`${classes.columns} ${classes.guildData}`}>
                <div className={classes.dataRow}>
                    {props.children}
                </div>
                <div className={classes.dataRow}>
                    Guild GP: {props.GP && (props.GP).toLocaleString("en-US")}
                </div>
                <div className={classes.dataRow}>
                    Members: {props.members}
                </div>
            </div>
            <div className={`${classes.columns} ${classes.actionRows}`}>
                <Button 
                    variant="outlined"
                    className={classes.button}
                    onClick={() => navigate(`/PlanTW/${props.guildId}/`)}
                >
                    Plan TW
                </Button>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => navigate(`/PlanTB/${props.guildId}/`)}
                >
                    Plan TB
                </Button>
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
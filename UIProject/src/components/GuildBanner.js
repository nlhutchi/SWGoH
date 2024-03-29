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
                Koolaid Mens
            </div>
            <div className={`${classes.columns} ${classes.guildData}`}>
                <div className={classes.dataRow}>
                    Guild GP: {props.GP && (props.GP).toLocaleString("en-US")}
                </div>
                <div className={classes.dataRow}>
                    Members: {props.members}
                </div>
                <div className={classes.dataRow}>
                    {props.children}
                </div>
            </div>
            <div className={`${classes.columns} ${classes.actionRows}`}>
                <Button 
                    variant="outlined"
                    className={classes.button}
                    onClick={() => navigate(`/Raids/`)}
                >
                    Raid Report
                </Button>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => navigate(`/TB/`)}
                >
                    TB Report
                </Button>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => navigate(`/TW/5kekVkXxRf6VgXEUvN16yA/`)}
                >
                    TW Report
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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Tabs, Tab } from '@mui/material';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    columns: {
        flexDirection: "columns",
        margin: 10
    },
    rows: {

    }
});

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PlanTW(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { allyCode, guildId } = useParams();
    const [ tabIndex, setTabIndex ] = useState(0);
    const guildData = props.memberData[guildId];

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.wrapper}>
                    <div className={classes.columns}>
                        <img className={classes.guildImage} src={`https://swgoh.gg/static/img/assets/tex.${props.guildIcon}.png`} alt={props.guildIcon}/>
                    </div>
                </div>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Player Tabs">
                    <Tab label="ROTE" {...a11yProps(0)} />
                    <Tab label="LS Geo" {...a11yProps(1)} />
                    <Tab label="DS Geo" {...a11yProps(2)} />
                    <Tab label="LS Hoth" {...a11yProps(3)} />
                    <Tab label="DS Hoth" {...a11yProps(4)} />
                </Tabs>
            </div>
            { tabIndex === 0 && 
                <div className={`${classes.wrapper}`} >
                    ROTE
                </div>
            }
            { tabIndex === 1 && 
                <div className={`${classes.wrapper}`} > LS Geo</div>
            }
            { tabIndex === 2 && 
                <div className={`${classes.wrapper}`} >
                    DS Geo
                </div>
            }
            { tabIndex === 3 && 
                <div className={`${classes.wrapper}`} >
                    LS Hoth
                </div>
            }
            { tabIndex === 4 && 
                <div className={`${classes.wrapper}`} >
                    LS Hoth
                </div>
            }
        </>
    );
}

function mapStateToProps(state) {
    return {
        characterData: state.MasterDataReducer.characterData,
        memberData: state.MemberDataReducer.memberData
    };
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PlanTW);
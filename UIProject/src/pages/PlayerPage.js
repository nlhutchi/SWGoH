import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Tabs, Tab } from '@mui/material';
import Character from '../components/Character';
import StarRating from '../components/StarRating';
import JourneyGuide from '../components/JourneyGuide';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    characterImg: {
        borderRadius: 100
    }
});

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PlayerPage(props) {
    const classes = useStyles();
    const { allyCode, guildId } = useParams();
    const [ tabIndex, setTabIndex ] = useState(0);
    const memberData = props.memberData[guildId][allyCode];

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <>
            <div>
                {memberData.data.name}
            </div>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Player Tabs">
                <Tab label="Characters" {...a11yProps(0)} />
                <Tab label="Ships" {...a11yProps(1)} />
                <Tab label="Journey Guide" {...a11yProps(2)} />
            </Tabs>
            { tabIndex === 0 && 
                <div
                    className={`${classes.wrapper}`}
                >
                    {
                        memberData.units
                            .sort((a, b) => b.data.power - a.data.power)
                            .map((unit) => {
                                if(unit.data.combat_type !== 2)
                                    return <div className={`col-xs-3`} key={unit.data.base_id}>
                                        <Character unit={unit.data} />
                                        <StarRating stars={unit.data.rarity}/>
                                        <div>{unit.data.name}</div>
                                        <div>{unit.data.power}</div>
                                    </div>
                            })
                    }
                </div>
            }
            { tabIndex === 1 && 
                <div
                    className={`${classes.wrapper}`}
                > Ships Tab</div>
            }
            { tabIndex === 2 && 
                <div
                    className={`${classes.wrapper}`}
                >
                    <JourneyGuide allyCode guildId />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);
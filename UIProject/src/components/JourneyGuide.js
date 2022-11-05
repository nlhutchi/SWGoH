import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Character from './Character';
import StarRating from './StarRating';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    glWrapper: {
        flex: 1,
        flexDirection: 'row',
        border: 'solid',
        margin: 20
    },
    reqsWrapper: {
        flex: 1,
        flexDirection: 'column',
    }
});

function JourneyGuide(props) {
    const classes = useStyles();
    const { allyCode, guildId } = useParams();
    const { glRequirements, characterData } = props;
    const unitMapping = props.memberData[guildId][allyCode].unitMapping;
    console.log('guildId', guildId)
    console.log('allyCode', allyCode)
    console.log('props.memberData[guildId][allyCode]', props.memberData[guildId][allyCode])
    console.log('unitMapping', unitMapping)

    return (
        <div className={classes.wrapper}>
            {
                glRequirements.map((gl) => {
                    return <div className={classes.glWrapper}>
                        <div>{gl.unitName}</div>
                        <div className={`${classes.reqsWrapper} col-xs-3`}>
                            {
                                gl.requiredUnits.map((unit) => {
                                    let unitData = unitMapping[unit.baseId]
                                    return <>
                                        <Character unit={unitData} />
                                        <StarRating stars={unitData.rarity}/>
                                    </>
                                })
                            }
                        </div>
                    </div>
                })
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        characterData: state.MasterDataReducer.characterData,
        glRequirements: state.MasterDataReducer.glRequirements,
        memberData: state.MemberDataReducer.memberData
    };
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(JourneyGuide);
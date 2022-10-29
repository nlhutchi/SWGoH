import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Character from '../components/Character';
import StarRating from '../components/StarRating';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    characterImg: {
        borderRadius: 100
    }
});

function PlayerPage(props) {
    const classes = useStyles();
    const { allyCode, guildId } = useParams();

    return (
        <>
            <div>
                {props.memberData[guildId][allyCode].data.name}
            </div>
            <div className={`${classes.wrapper}`}>
                {
                    props.memberData[guildId][allyCode].units
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
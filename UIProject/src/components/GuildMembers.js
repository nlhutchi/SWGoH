import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import MemberCard from './MemberCard';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

function GuildMembers(props) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            {
                props.guildMasterData && props.guildMasterData.roster.map((member) => {
                    return <MemberCard 
                        key={member.id}
                        allyCode={member.allyCode}
                        memberName={member.name}
                        gp={member.gp}
                        gpChar={member.gpChar}
                        gpShip={member.gpShip}
                    />
                })
            }
            <MemberCard/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        guildMasterData: state.GuildDataReducer.guildMasterData
    };
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GuildMembers);
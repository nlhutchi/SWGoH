import React from 'react';
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
                props.guildMasterData ?
                    props.guildMasterData[props.selectedGuild].members.map((member) => {
                        return <MemberCard 
                            guildId={props.selectedGuild}
                            key={member.ally_code}
                            allyCode={member.ally_code}
                            memberName={member.player_name}
                            gp={member.galactic_power}
                            league={member.league_name}
                            userFrame={member.league_frame_image}
                            userImg={member.portrait_image}
                        />
                    }) : null
            }
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
import { SET_GUILD_MASTER_DATA } from '../actions/GuildDataActions';

const initialState = {
    guildMasterData: undefined
};

const guildDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GUILD_MASTER_DATA:
            return Object.assign({}, state, {
                guildMasterData: {
                    ...state.guildMasterData,
                    [action.payload.guild_id]: {
                        ...action.payload,
                        members: action.payload.members.sort((a, b) => b.galactic_power - a.galactic_power)
                    }
                }
            });
        default:
            return state;
    }
};

export default guildDataReducer;

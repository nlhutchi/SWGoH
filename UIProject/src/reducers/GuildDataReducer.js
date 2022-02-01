import { SET_GUILD_MASTER_DATA } from '../actions/GuildDataActions';

const initialState = {
    guildMasterData: undefined
};

const masterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GUILD_MASTER_DATA:
            return Object.assign({}, state, {
                guildMasterData: action.payload
            });
        default:
            return state;
    }
};

export default masterReducer;

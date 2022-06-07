import { combineReducers } from 'redux';
import GuildDataReducer from './GuildDataReducer';
import MemberDataReducer from './MemberDataReducer';
import MasterDataReducer from './MasterDataReducer';

const initialState = {
    showLoadingScreen: false
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        default:
            break;
    }

    return state;
}

export default combineReducers({
    rootReducer,
    GuildDataReducer,
    MemberDataReducer,
    MasterDataReducer
});
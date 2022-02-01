import { combineReducers } from 'redux';
import GuildDataReducer from './GuildDataReducer';

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
    GuildDataReducer
});
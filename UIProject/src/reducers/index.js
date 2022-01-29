import { combineReducers } from 'redux';

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
    rootReducer
});
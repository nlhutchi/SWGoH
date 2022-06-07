import { SET_CHARACTER_MASTER_DATA } from '../actions/MasterDataActions';

const initialState = {
    characterData: {}
};

const masterDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHARACTER_MASTER_DATA:
            return Object.assign({}, state, {
                characterData: action.payload
            });
        default:
            return state;
    }
};

export default masterDataReducer;

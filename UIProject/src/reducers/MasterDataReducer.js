import { SET_CHARACTER_MASTER_DATA } from '../actions/MasterDataActions';

const initialState = {
    characterData: {}
};

const masterDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHARACTER_MASTER_DATA:
            var characterData = {};
            Object.values(action.payload).forEach((character) => {
                characterData[character.base_id] = character;
            });

            return Object.assign({}, state, {
                characterData
            });
        default:
            return state;
    }
};

export default masterDataReducer;

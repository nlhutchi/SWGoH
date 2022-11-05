import { SET_CHARACTER_MASTER_DATA, SET_GL_MASTER_DATA } from '../actions/MasterDataActions';

const initialState = {
    characterData: {},
    glRequirements: {}
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
        case SET_GL_MASTER_DATA:
            return Object.assign({}, state, {
                glRequirements: action.payload.units
            });
        default:
            return state;
    }
};

export default masterDataReducer;

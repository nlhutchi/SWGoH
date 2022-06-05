import { SET_MEMBER_DATA } from '../actions/MemberDataActions';

const initialState = {
    memberData: {}
};

const masterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMBER_DATA:
            return Object.assign({}, state, {
                memberData: {
                    ...state.memberData,
                    [action.payload.allyCode]: action.payload.memberData
                }
            });
        default:
            return state;
    }
};

export default masterReducer;

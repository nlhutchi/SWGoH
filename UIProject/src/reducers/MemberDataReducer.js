import { SET_MEMBER_DATA } from '../actions/MemberDataActions';

const initialState = {
    memberData: {}
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMBER_DATA:
            var memberObj = {};
            action.payload.memberDataArray.forEach((memberData) => {
                if(memberData) {
                    memberObj[memberData.data.ally_code] = memberData;
                }
            });
            return Object.assign({}, state, {
                memberData: {
                    ...state.memberData,
                    [action.payload.guildId]: memberObj
                }
            });
        default:
            return state;
    }
};

export default memberReducer;

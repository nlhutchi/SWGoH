import { SET_MEMBER_DATA } from '../actions/MemberDataActions';

const initialState = {
    memberData: {}
};

const masterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMBER_DATA:
            var memberObj = {};
            console.log(action.payload)
            action.payload.forEach((memberData) => {
                console.log(memberData)
                if(memberData) {
                    memberObj[memberData.data.ally_code] = memberData;
                }
            });
            return Object.assign({}, state, {
                memberData: memberObj
            });
        default:
            return state;
    }
};

export default masterReducer;

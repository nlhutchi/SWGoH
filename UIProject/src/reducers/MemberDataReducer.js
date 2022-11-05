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
                    let unitMapping = {};
                    memberData.units.forEach((unit) => {
                        unitMapping[unit.data.base_id] = unit.data
                    });
                    memberObj[memberData.data.ally_code] = memberData;
                    memberObj[memberData.data.ally_code].unitMapping = unitMapping;
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

export const SET_MEMBER_DATA = 'SET_MEMBER_DATA';
export const setMemberData = (allyCode, memberData) => ({
    type: SET_MEMBER_DATA,
    payload: { allyCode, memberData }
});

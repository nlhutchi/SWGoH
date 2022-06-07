export const SET_MEMBER_DATA = 'SET_MEMBER_DATA';
export const setMemberData = (guildId, memberDataArray) => ({
    type: SET_MEMBER_DATA,
    payload: { guildId, memberDataArray }
});

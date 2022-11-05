export const SET_CHARACTER_MASTER_DATA = 'SET_CHARACTER_MASTER_DATA';
export const setCharacterMasterData = (characterData) => ({
    type: SET_CHARACTER_MASTER_DATA,
    payload: characterData
});

export const SET_GL_MASTER_DATA = 'SET_GL_MASTER_DATA';
export const setGLMasterData = (GLReqData) => ({
    type: SET_GL_MASTER_DATA,
    payload: GLReqData
});

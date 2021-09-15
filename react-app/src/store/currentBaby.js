const SETCURRENTBABY = 'currentBaby/SETCURRENTBABY';

export const setCurrentBaby = (payload) => {
    return {
        type: SETCURRENTBABY,
        payload
    }
}
const initialState = {}
const setCurrentBabyReduer = (state= initialState, action) => {
        switch(action.type){
            case SETCURRENTBABY:
                return action.payload
            default:
                return state
        }


}

export default setCurrentBabyReduer
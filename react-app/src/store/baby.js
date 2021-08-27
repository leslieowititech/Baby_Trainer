const CREATE_BABY = 'babies/SET_BABY';
const GET_BABY = 'babies/GET_BABY';


const setBaby = (baby) => {
    return {
        type: CREATE_BABY,
        payload: baby
    }
}

const getBaby = (baby) => {
    return {
        type: GET_BABY,
        payload: baby
    }
}

const initialState = { babies: null}

const babyReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_BABY:
            newState = Object.assign({}, state);
            newState = action.payload.babies
            return newState
        default:
            return state
    }
}

export const findBabies = () => async dispatch => {
    const response = await fetch('/api/babies/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();    
    if(response.ok){
        await dispatch(getBaby(data));
        return response;
    }
}

export default babyReducer;
import { deleteAFeed } from "./feed";

const CREATE_DIAPER = 'diapers/CREATE_DIAPER';
const GET_DIAPER = 'diapers/GET_DIAPER';
const DELETE_DIAPER = 'diapers/DELETE_DIAPER';
const EDIT_DIAPER = 'diapers/EDIT_DIAPER';

const setDiaper = (diaper) => {
    return {
        type: CREATE_DIAPER,
        payload: diaper
    }
}

const getDiaper = (diaper) => {
    return {
        type: GET_DIAPER,
        payload: diaper
    }
}

const deleteDiaper = (id) => {
    return {
        type: DELETE_DIAPER,
        payload: id
    }
}

const editDiaper = (diaper) => {
    return {
        type: EDIT_DIAPER,
        payload: diaper
    }
}

const initialState = { diaper: null }

const diaperReducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type){
        case GET_DIAPER:
            // console.log(action.payload.diapers, '____________diaperAction')
            action.payload.diapers.forEach(diaper => {
                newState[diaper.id] = diaper
            });
            return newState
        case DELETE_DIAPER:
            delete newState[action.payload];
            return newState
        case CREATE_DIAPER:
            newState[action.payload.id] = action.payload
            return newState
        case EDIT_DIAPER:
        default:
            return newState
    }

}

export const getAllDiapers = () => async dispatch => {
    const response = await fetch('/api/diapers/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        const data = await response.json();
        dispatch(getDiaper(data));
        return response
    }
}

export const deleteADiaper = (id) => async dispatch => {
    const response = await fetch(`/api/diapers/${id}`, {
        method: 'DELETE',
    })

    if(response.ok){
        await dispatch(deleteDiaper(id))
    }
}

export const addADiaper = (payload) => async dispatch => {
    const response = await fetch(`/api/diapers/create`)
}


export default diaperReducer;
const CREATE_BABY = 'babies/SET_BABY';
const GET_BABY = 'babies/GET_BABY';
const DELETE_BABY = 'babies/DELETE_BABY';
const EDIT_BABY = 'babies/EDIT_BABY';


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

const deleteBaby = (id) => {
    return {
        type: DELETE_BABY,
        babId: id
    }
}

const editBaby = (baby) => {
    return {
        type: EDIT_BABY,
        baby
    }
}

const initialState = { babies: null}

const babyReducer = (state = initialState, action) => {
    let newState= {...state};
    switch(action.type){
        case GET_BABY:
            // newState = { ...action.payload.babies};
            // console.log(action.payload, '_____________________action.payload')
            action.payload.babies.forEach(baby => {
                newState[baby.id] = baby
            });
            return newState
        case CREATE_BABY:
            newState[action.payload.baby?.id] = action.payload.baby
            return newState
        case DELETE_BABY: 
        console.log(newState[action.babId], 'newState[action.babId]___________Here') 
        console.log(newState, '_______________neewStateHere')  
        console.log(action.babId, '_____________action.babIdHere')       
             delete newState[action.babId];
             return newState
        case EDIT_BABY:
            console.log(action)
            return {
                ...state,
                [action.baby.id]: action.baby
            }
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
    // console.log(data, 'allbabies____here') 
    if(response.ok){
        await dispatch(getBaby(data));
        return response;
    }
}

export const addBaby = (name, birthday, id) => async (dispatch) => {
    // console.log('Payload____ HEREEE')
    const response = await fetch('/api/babies/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            birthday,
            id
        }),
    });
    const data = await response.json();

    if (response.ok) {
        await dispatch(setBaby(data))
        return response;
    } else if (response.status < 500) {
        // const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteABaby = (id) => async (dispatch) => {
    const response = await fetch(`/api/babies/${id}`, {
        method: 'DELETE',
    });

    if(response.ok) {
        await dispatch(deleteBaby(id))
        return response
    }else{
        return [`That didn't work please try again! :(`]
    }

}

export const editABaby = (data, id) => async dispatch => {
    // console.log(data, 'data________________here')
    const response = await fetch(`/api/babies/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: data.name,
            birthday: data.birthday,
            user_id: data.user_id
        })
    })
    // console.log(response, 'here_________response')
    if(response.ok){
        const baby = await response.json();
        dispatch(editBaby(baby))
        return baby
    }
}

export default babyReducer;
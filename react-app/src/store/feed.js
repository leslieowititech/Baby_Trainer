const CREATE_FEED = 'feeds/CREATE_FEED';
const GET_FEED = 'feeds/GET_FEED';
const DELETE_FEED = 'feeds/DELETE_FEED';
const EDIT_FEED = 'feeds/EDIT_FEED';


const setFeed = (feed) => {
    return {
        type: CREATE_FEED,
        payload: feed
    }
}

const getFeed = (feed) => {
    return {
        type: GET_FEED,
        payload: feed
    }
}

const deleteFeed = (id) => {
    return {
        type: DELETE_FEED,
        payload: id
    }
}

const editFeed = (feed) => {
    return {
        type: EDIT_FEED,
        payload: feed
    }
}

const initialState = { feed: null }

const feedReducer = ( state = initialState, action) =>  {
    let newState = {...state}
    switch(action.type){
        case GET_FEED:
            console.log(action.payload, '_____________testingGetFeeds')
            return newState
        case DELETE_FEED:
        case EDIT_FEED:
        case CREATE_FEED:
        default:
            return state
    }
}


export const addAFeed = (type, feed_time, amount, user_id, baby_id) => async (dispatch) => {
    const response = await fetch('/api/feeds/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                type,
                feed_time,
                amount,
                user_id,
                baby_id
        })
    })

    if(response.ok){
        const data = await response.json();
        dispatch(setFeed(data))
        return response
    }
}

export const getFeeds = () => async dispatch => {
    const response = await fetch('/api/feeds/', {
        headers: {
            'ContentType': 'application/json'
        }
    })
    if(response.ok){
        const data = await response.json();
        dispatch(getFeed(data))
        return response
    }
}
 


export default feedReducer;
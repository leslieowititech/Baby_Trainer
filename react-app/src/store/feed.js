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

const initialState = { }

const feedReducer = ( state = initialState, action) =>  {
    let newState = {...state}
    switch(action.type){
        case GET_FEED:
            // console.log(action.payload.feeds, '_____________testingGetFeeds')
            action.payload.feeds.forEach(feed => {
                newState[feed.id] = feed
            }) 
            return newState
        case DELETE_FEED:
            delete newState[action.payload];
            return newState
        case EDIT_FEED:
            console.log(action.payload, '_________EditStore')
           return  {  ...state,
                [action.payload.id]: action.payload
            }
        case CREATE_FEED:
            // console.log(action, '________________testingCreateFeeds')
            newState[action.payload?.id] = action.payload
            return newState
        default:
            return state
    }
}

export const editAFeed = (data, id) => async dispatch => {
    console.log(data, '________dataHere')
    const response = await fetch(`/api/feeds/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            type: data.type,
            feed_time: data.feed_time,
            amount: data.amount,
            user_id: data.user_id,
            baby_id: data.baby_id
        })
    })

    if(response.ok){
        const feed = await response.json()
        dispatch(editFeed(feed))
        return feed
    }
}

export const addAFeed = (payload) => async (dispatch) => {
    // console.log(payload, '___________________store')
    const response = await fetch('/api/feeds/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                type: payload.type,
                feed_time: payload.feed_time,
                amount: payload.amount,
                user_id: payload.user_id,
                baby_id: payload.baby_id
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

export const deleteAFeed = (id) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${id}`, {
        method: 'DELETE',
    })

    if(response.ok){
        await dispatch(deleteFeed(id))
    }
}
 


export default feedReducer;
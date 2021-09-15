import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFeeds } from '../../store/feed';
import { deleteAFeed } from '../../store/feed';
import { editAFeed } from '../../store/feed';
import { findBabies } from '../../store/baby';
import './FeedLogs.css';


const FeedLogs = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds);
    const user = useSelector(state => state.session.user);
    const userId = user.id;
    const currentBaby = useSelector(state => state.currentBaby);

    const feedData = Object.values(feeds);
    
    

    const userFeedData = feedData.filter(feed => {
        return feed.user_id === userId
    }).filter(feed => feed.baby_id === currentBaby.id).filter(feed => feed.baby_id === currentBaby.id)

    

    const handleEditState = (e, id) => {
        e.preventDefault();
        const editForm = document.getElementById(`feed-log-edit-${id}`);
        if(editForm.style.visibility === 'visible'){
            editForm.style.visibility = 'hidden'
            editForm.style.display = 'none'
        }else if(editForm.style.visibility === 'hidden'){
            editForm.style.visibility = 'visible'
            editForm.style.display = 'flex'
        }

    }

    const [amount, setAmount] = useState();
    const [type, settype] = useState();
    const [feedTime, setFeedTime] = useState(new Date());

    const payload = {
        user_id: user.id,
        type,
        feed_time: feedTime,
        amount: amount
    }

    const editSpecificFeed = (e, baby_id, id) => {
        e.preventDefault()
        payload.baby_id = baby_id
        dispatch(editAFeed(payload, id))
        handleEditState(e, id)
    }
     
    const deleteSpecificFeed = (id) => {
        dispatch(deleteAFeed(id))
    }
    useEffect(() => {
        dispatch(getFeeds())
        dispatch(findBabies())
    }, [dispatch])

    return (
        <div className='feed-log-container'>
            <h1>Feed Logs 🍼</h1>
            {userFeedData.length ? <h3>{`Feed logs for baby ${currentBaby.name}`}</h3> : <h3>No feed logs please enter a feeding to view feeds</h3>}
            <div>
                {userFeedData?.map(feedObj => (
                    <div key={feedObj.id}>
                        <div id={`feed-log-info-${feedObj.id}`} className='feed-log-card'>
                            <h2>
                                {`Baby Name: ${currentBaby.name}`}
                            </h2>
                            <h3>{`Feed Date: ${feedObj.feed_time}`}</h3>
                            <h3>
                                {`Amount in minutes: ${feedObj.amount}`}
                            </h3>
                            <h3>
                                {`Feed type: ${feedObj.type}`}
                            </h3>
                        </div>
                        <form 
                                id={`feed-log-edit-${feedObj.id}`}
                                className='feed-log-card form'
                                onSubmit={(e) => editSpecificFeed(e, feedObj.baby_id, feedObj.id)}
                                style={{ visibility: 'hidden', display: 'none' }}
                                >
                            <h2>{`Baby Name: ${feedObj.babyName}`}</h2>
                            <label htmlFor='amount'>Amount in minutes</label>
                            <input 
                                    id='amount'
                                    className='feed-log-input-box'
                                    value={amount}
                                    type='number'
                                    placeholder='How long your baby ate.'
                                    onChange={(e) => setAmount(e.target.value)}
                                    ></input>
                            <label htmlFor='feed-date'>Feed date</label>
                            <input 
                                    id='feed-date' 
                                    className='feed-log-input-box'
                                    value={feedTime}
                                    onChange={(e) => setFeedTime(e.target.value)}
                                    type='date'></input>
                            <label htmlFor='feed-type'>Feed Type</label>
                            <input 
                                    id='feed-type'
                                    className='feed-log-input-box'
                                    placeholder='bottle or breast?'
                                    value={type}
                                    onChange={(e) => settype(e.target.value)}
                                    ></input>
                            <button className='logs-save-btn'>Save</button>
                        </form>
                        <div>
                            <button
                                    onClick={(e) => handleEditState(e, feedObj.id)}
                                    className='logs-edit-btn'
                            >Edit</button>
                            <button 
                                    className='logs-delete-btn'
                                    onClick={() => deleteSpecificFeed(feedObj.id)}
                                    >Delete</button>
                        </div>
                    </div>

                )) }
                {/* {noData && <h3 className='no-feed-msg'>No feeds yet  please add a feed to see logs</h3>} */}
            </div>

        </div>
    )
}

export default FeedLogs;
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
    const babies = useSelector(state => state.babies);
    const userId = user.id;

    const feedData = Object.values(feeds);
    if(feedData){
        feedData.pop()
    }
    const babyData = Object.values(babies);
    if(babyData){
        babyData.pop()
    }

    const userFeedData = feedData.filter(feed => {
        return feed.user_id === userId
    })

    const normaliseData = () => {
        let newData = [];

        for(let i = 0 ; i < babyData.length ; i++){
            let baby = babyData[i];

            for(let j = 0 ; j < userFeedData.length; j++){
                let feed = userFeedData[j];
                if(feed.baby_id === baby.id){
                    feed.babyName = baby.name;
                    newData.push(feed)
                }
            } 
        }
        return newData
    }

    normaliseData()//add babynames to the feed log

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
    const [feedTime, setFeedTime] = useState(new Date())

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
    }, [dispatch])

    return (
        <div className='feed-log-container'>
            <h1>Feed Logs 🍼</h1>
            <div>
                {userFeedData.map(feedObj => (
                    <div key={feedObj.id}>
                        <div id={`feed-log-info-${feedObj.id}`} className='feed-log-card'>
                            <h2>
                                {`Baby Name: ${feedObj.babyName}`}
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

                ))}
            </div>

        </div>
    )
}

export default FeedLogs;
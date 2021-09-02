import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import LogoutButton from '../../auth/LogoutButton';
// import { findBabies } from '../../../store/baby';
import { getFeeds } from '../../../store/feed';
import { deleteAFeed } from '../../../store/feed';
import { editAFeed } from '../../../store/feed';
import { getAllDiapers } from '../../../store/diaper';
import { deleteADiaper } from '../../../store/diaper';
// import EditPageDropDown from '../../BabyDropDown/EditPageDropDown';
import './EditPage.css';

const EditPage = () => {
    const { babyId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const feeds = useSelector(state => state.feeds);
    const diapers = useSelector(state => state.diapers);
    const babies = useSelector(state => state.babies);
   
    
    const feedData = Object.values(feeds);
    if(feedData){
        feedData.pop()
        
    }
    const diaperData = Object.values(diapers);  
    if(diaperData){
        diaperData.pop()
    }
    
    const babyData = Object.values(babies);

    const [showFeedData, setShowFeedData ] = useState(false);
    const [showDiaperData, setShowDiaperData] = useState(false); 
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('')
    const [editMode, setEditMode] = useState(false)

    const payload = {
        user_id: user.id,
        type,
        amount
    }

    const editSpecificFeed = (e, baby_id, id) => {
        e.preventDefault()  
        payload.baby_id = baby_id      
        dispatch(editAFeed(payload, id))
    }

    
    const deleteSpecificFeed = (id) => {
        dispatch(deleteAFeed(id))
    }

    const deleteSpecificDiaper = (id) => {
        dispatch(deleteADiaper(id))
    }

    useEffect(() => {
        dispatch(getFeeds())
    },[dispatch])
    useEffect(() => {
        dispatch(getAllDiapers())
    },[dispatch])
    // useEffect(() => {
    //     dispatch(findBabies())
    // },[dispatch]) 
    return (
        <div className='edit-page-container'>
            <div className='nav-bar'>
                <NavLink to='/home' className='home-link'>Home</NavLink>
                {/* <EditPageDropDown/> */}
                <LogoutButton />
            </div>
            <div className='edit-page-btns'>
                <button className='chart-btn edit-page-btn'>Sleep</button> 
                <button className='chart-btn edit-page-btn' onClick={showFeedData ? () => setShowFeedData(false) : () => setShowFeedData(true)}>Feed</button>
                <button className='chart-btn edit-page-btn' onClick={showDiaperData ? () => setShowDiaperData(false) : () => setShowDiaperData(true)}>Diaper</button>
            </div>
                {showFeedData && 
                  
                    <div className='edit-data'>
                        {feedData.map(feed => (
                            <>
                                <div className='data-container' key={feed.id} >
                                    <div className='data-item'>
                                        <div>{`Type: ${feed.type}`}</div>
                                        <div>{`Amount in oz: ${feed.amount}`}</div>
                                    </div>
                                    <div >
                                        <button 
                                                className='util-btn edit-btn'
                                                onClick={editMode ? () => setEditMode(false):() => setEditMode(true)}
                                                >Edit</button>
                                        <button
                                                onClick={() => deleteSpecificFeed(feed.id)} 
                                                className='util-btn delete-btn'
                                        >Delete</button>
                                    </div>
                                </div>
                                {editMode && 
                                
                                    <form onSubmit={(e) => editSpecificFeed(e, feed.baby_id, feed.id)} className='edit-page-form'>
                                        <input
                                                placeholder='Enter new feed amount'
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className='edit-page-form-input'
                                        ></input>
                                        <input
                                                placeholder='Enter type of feed bottle/breast?'
                                                // type='date'
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                className='edit-page-form-input'
                                        ></input>
                                        <button type='submit'>Save</button>
                                    </form>
                                }
                            </>
                            
                        ))}
                    </div>
                    
                    
                }
                {showDiaperData && 
                <div className='edit-data'>
                    {diaperData.map(diaper => (
                        <div className='data-container' key={diaper.id} >
                            <div className='data-item'>
                                <div>{`Diaper change time: ${diaper.change_time}`}</div>
                                <div>{`Type: ${diaper.type}`}</div>
                            </div>
                            <div >
                                <button>Edit</button>
                                <button
                                        onClick={() => deleteSpecificDiaper(diaper.id)}
                                        className='util-btn delete-btn'
                                >Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                }
          
        </div>
    )
}

export default EditPage;
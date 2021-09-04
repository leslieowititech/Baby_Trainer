import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { useParams } from 'react-router';
import LogoutButton from '../../auth/LogoutButton';
// import { findBabies } from '../../../store/baby';
import { getFeeds } from '../../../store/feed';
import { deleteAFeed } from '../../../store/feed';
import { editAFeed } from '../../../store/feed';
import { getAllDiapers } from '../../../store/diaper';
import { deleteADiaper } from '../../../store/diaper';
import { editADiaper } from '../../../store/diaper';
// import EditPageDropDown from '../../BabyDropDown/EditPageDropDown';
import DiaperLogs from '../../DiaperandFeedLogs/DiaperLogs';
import './EditPage.css';

const EditPage = () => {
    // const { babyId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const feeds = useSelector(state => state.feeds);
    const diapers = useSelector(state => state.diapers);
    // const babies = useSelector(state => state.babies);
   
    
    const feedData = Object.values(feeds);
    if(feedData){
        feedData.pop()
        
    }
    const diaperData = Object.values(diapers);  
    if(diaperData){
        diaperData.pop()
    }
    
    // const babyData = Object.values(babies);
    //For Feeed
    const [showFeedData, setShowFeedData ] = useState(false);
    const [showDiaperData, setShowDiaperData] = useState(false); 
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('')
    const [editMode, setEditMode] = useState(false);
    // const [message, set]

    // //forDiaper
    const [editDiaperMode, setEditDiaperMode] = useState(false);
    const [diaperType, setDiaperType] = useState('');

    const payload = {//for feed
        user_id: user.id,
        type,
        amount,  
        change_time: new Date()   
    }

    const payloadFordiaper = {//for diaper
        user_id: user.id,
        type: diaperType,
        change_time: '2017-09-05 18:45:28'
    
    }
    const editSpecificDiaper = (e, baby_id, id) => {
        e.preventDefault()
        payloadFordiaper.baby_id = baby_id
        dispatch(editADiaper(payloadFordiaper, id))
    }

    const editSpecificFeed = (e, baby_id, id) => {
        e.preventDefault()  
        const logItemGettingedited = document.getElementById(`feed-log-item-${id}`)
        const editFormforlogItem = document.getElementById(`feed-edit-item-${id}`)
        logItemGettingedited.style.visibility = 'visible'
        editFormforlogItem.style.visibility = 'hidden'
        payload.baby_id = baby_id      
        dispatch(editAFeed(payload, id))
    }

    
    const deleteSpecificFeed = (id) => {
        dispatch(deleteAFeed(id))
    }

    const deleteSpecificDiaper = (id) => {
        dispatch(deleteADiaper(id))
    }

    const handleEditState = (e, id) => {
        e.preventDefault()
        const logItemGettingedited = document.getElementById(`feed-log-item-${id}`)
        const editFormforlogItem = document.getElementById(`feed-edit-item-${id}`)
        if (editFormforlogItem.style.visibility === 'hidden'){
            editFormforlogItem.style.visibility = 'visible'
            logItemGettingedited.style.visibility = 'hidden'
        }else{
            editFormforlogItem.style.visibility = 'hidden'
            logItemGettingedited.style.visibility = 'visible'
        }
        
    }

    const handleEditStateDiapers = (e, id) => {
        e.preventDefault()
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
            <div className='all-logs'>
                    <DiaperLogs/>
                    <div className='edit-data'>
                        <h2>Feed Logs</h2>
                        {feedData.map(feed => (
                            <>
                                <div className='data-container' key={feed.id} >
                                    <div className='data-item' id={`feed-log-item-${feed.id}`}>
                                        <div>{`Type: ${feed.type}`}</div>
                                        <div>{`Amount in minutes: ${feed.amount}`}</div>
                                    </div>
                                    <div >
                                        <button 
                                                className='util-btn edit-btn'
                                                onClick={(e) => handleEditState(e, feed.id)}
                                                >Edit</button>
                                        <button
                                                onClick={() => deleteSpecificFeed(feed.id)} 
                                                className='util-btn delete-btn'
                                        >Delete</button>
                                    </div>
                                </div>
                                
                                
                                <form style={{ visibility: 'hidden' }} onSubmit={(e) => editSpecificFeed(e, feed.baby_id, feed.id)} className='edit-page-form' id={`feed-edit-item-${feed.id}`}>
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
                                    <button type='submit' className='save-form-btn'>Save</button>
                                    </form>
                                
                            </>
                            
                        ))}
                    </div>

                 
                <div className='edit-data'>
                    <h2>Diaper Logs</h2>
                    {diaperData.map(diaper => (
                        <>
                          
                            
                                <div className='data-container' key={diaper.id} >
                                    <div className='data-item' >
                                        <div>{`Diaper change time: ${diaper.change_time}`}</div>
                                        <div>{`Type: ${diaper.type}`}</div>
                                    </div>
                                    <div >
                                        <button 
                                            className='util-btn edit-btn'
                                            onClick={editDiaperMode ? () => setEditDiaperMode(false) :() => setEditDiaperMode(true)}
                                        >Edit</button>
                                        <button
                                                onClick={() => deleteSpecificDiaper(diaper.id)}
                                                className='util-btn delete-btn'
                                        >Delete</button>
                                    </div>
                                </div>
                           
                            
                            
                                <form className='edit-page-form' onSubmit={(e) => editSpecificDiaper(e, diaper.baby_id, diaper.id)}>
                                
                                    <input 
                                        className='edit-page-form-input'
                                        placeholder='Enter diaper change type'
                                        value={diaperType}
                                        onChange={(e) => setDiaperType(e.target.value)}
                                    ></input>
                                    <button type='submit' className='save-form-btn'>Save</button>
                                </form>
                            
                        </>
                    ))}
                </div>
            </div>
                
          
        </div>
    )
}

export default EditPage;
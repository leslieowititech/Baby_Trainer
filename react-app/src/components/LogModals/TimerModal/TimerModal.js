import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';


import './TimerModal.css';
import { addAFeed } from '../../../store/feed';

const TimerModal = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const {babyId} = useParams();
    console.log(babyId,'________________babyId')

    const playUrl = 'https://image.flaticon.com/icons/png/512/702/702148.png';
    const pauseUrl = 'https://image.flaticon.com/icons/png/512/2088/2088562.png';



    let url;

    const [playState, setPlaySate] = useState(false);

    if(playState){
        url = pauseUrl
    }else{
        url=playUrl
    }    

    const {
        seconds,
        minutes,
        hours,
        days,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const handlePlay = () => {
        if(babyId){

            setPlaySate(true)  && start()      
        }else{
            alert('Please select a baby')
        }
    }

    const handlePause = () => {
        setPlaySate(false) && pause()
    }

    
    const payload = {
        // feed_time='2017-09-05 19:45:28',
        feed_time: new Date().toISOString(),
        user_id: user.id
    }
    // console.log(new Intl.DateTimeFormat('en'), '_________________time test')
    

    return (
        <div className='timer-modal-container'>
            <div className='timer-modal-image-div'>
                <img src={url} alt={url} className='timer-modal-image' onClick={playState ? handlePause : handlePlay}/>               
            </div>
            {playState && 
                <div style={{ textAlign: 'center' }} className='timer'>                    
                    <div style={{ fontSize: '100px' }}>
                        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                    <div className='timer-modal-controls'>
                        <button onClick={reset} className='timer-modal-btn'>Reset</button>
                        <button className='timer-modal-btn'>Save</button>
                    </div>                                     
                </div>

            }
        </div>
    )
}

export default TimerModal;
import React, { useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useSelector, useDispatch } from 'react-redux';



import './TimerModal.css';
import { addAFeed } from '../../../store/feed';

const TimerModal = ({type}) => {
    // console.log(type, 'type_______')
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const currentBaby = useSelector(state => state.currentBaby);


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
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });

    const handlePlay = () => {
        if(currentBaby.id){
            
            setPlaySate(true) 
            start()      
        }else{
            alert('Please select a baby.')
        }
    }

    const getTotalTimeForFeed = () => {
        let totalMinutes = 0;
        if(seconds > 0) {
            let mins = seconds / 60
            totalMinutes = totalMinutes + mins
        }
        if(minutes > 0){          
            totalMinutes = totalMinutes + minutes
        }
        if(hours > 0){
            let mins = hours * 60
            totalMinutes = totalMinutes + mins
        }

        return totalMinutes;
    }

    const handlePause = () => {        
        setPlaySate(false) 
        pause()
    }


    
    const payload = {
        // feed_time='2017-09-05 19:45:28',
        feed_time: new Date().toDateString(),
        user_id: user.id,
        baby_id: currentBaby.id,
        amount: getTotalTimeForFeed(),
        type
    }

    const handleSave = () => {
        pause()
        dispatch(addAFeed(payload))
        alert('feed saved go to view logs to see it or edit it')
    }

    
   
    // console.log(isRunning, '__________running?')

    return (
        <div className='timer-modal-container'>
            <div className='timer-modal-image-div'>
                <img src={url} alt={url} className='timer-modal-image' onClick={playState ? handlePause : handlePlay}/> 
                {!isRunning && <div style={{ fontSize: '100px' }}>
                    <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                    <div className='timer-modal-controls'>
                        <button onClick={reset} className='timer-modal-btn'>Reset</button>
                        <button className='timer-modal-btn' onClick={handleSave}>Save</button>
                    </div>
                    </div>}
            </div>
            {playState && 
                <div style={{ textAlign: 'center' }} className='timer'>                    
                    <div style={{ fontSize: '100px' }}>
                        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                    </div>
                                                        
                </div>

            }
        </div>
    )
}

export default TimerModal;
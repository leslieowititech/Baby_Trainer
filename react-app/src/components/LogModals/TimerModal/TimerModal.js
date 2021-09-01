import React from 'react';

import './TimerModal.css'

const TimerModal = ({playState}) => {
    const playUrl = 'https://image.flaticon.com/icons/png/512/702/702148.png';
    const pauseUrl = 'https://image.flaticon.com/icons/png/512/2088/2088562.png';

    let url;

    if(playState){
        url = playUrl
    }else{
        url=pauseUrl
    }

    return (
        <div className='timer-modal-container'>
            <div className='timer-modal-image-div'>
                <img src={url} alt={url} className='timer-modal-image'/>
            </div>
        </div>
    )
}

export default TimerModal;
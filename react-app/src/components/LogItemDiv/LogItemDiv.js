import React from 'react'

import './LogItemDiv.css'

const LogItemDiv = ({title, imgUrl}) => {
    return (
        <div className='log-item'>
            <h2 className='log-item-title'>
                {title}
            </h2>
            <div className='icon'>
                <image src={imgUrl}/>
            </div>
        </div>
    )
}

export default LogItemDiv
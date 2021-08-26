import React from 'react'

import './LogItemDiv.css'

const LogItemDiv = ({title}) => {
    return (
        <div className='log-item'>
            <h2 className='log-item-title'>
                {title}
            </h2>
        </div>
    )
}

export default LogItemDiv
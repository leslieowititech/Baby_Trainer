import React from 'react';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import LogItemDiv from '../LogItemDiv/LogItemDiv';
import './HomePage.css'

const HomePage = () => {
    return (
        <div className='home-page-container'>
           <div className='nav-bar'>
                Hello from home page
                <LogoutButton/>           
           </div>
           <div className='loggging-div'>
                <LogItemDiv title='Sleep'/>
                <LogItemDiv title='Feed'/>
                <LogItemDiv title='Diaper'/>
           </div>
        </div>
    )
}

export default HomePage
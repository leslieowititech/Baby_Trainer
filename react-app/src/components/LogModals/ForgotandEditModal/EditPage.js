import React from 'react';

import { NavLink } from 'react-router-dom';
// import { useParams } from 'react-router';
import LogoutButton from '../../auth/LogoutButton';

import DiaperLogs from '../../DiaperandFeedLogs/DiaperLogs';
import FeedLogs from '../../DiaperandFeedLogs/FeedLogs';
import './EditPage.css';

const EditPage = () => {    
  
    return (
        <div className='edit-page-container'>
            <div className='nav-bar'>
                <NavLink to='/home' className='home-link'>Home</NavLink>
                {/* <EditPageDropDown/> */}
                <LogoutButton />
            </div>
            <div className='all-logs'>
                    <DiaperLogs/>
                    <FeedLogs/>                                 
                
            </div>
                
          
        </div>
    )
}

export default EditPage;
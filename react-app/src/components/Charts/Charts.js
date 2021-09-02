import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutButton from '../auth/LogoutButton';
import './Charts.css';


const Charts = () => {
    return (
        <div className='charts-container'>
            <div className='nav-bar'>
                <NavLink to='/home' className='home-link'>Home</NavLink>
                <LogoutButton />
            </div>
            <h1>Baby Name</h1>
            <div className='charts-info'>
                <div className='chart-btns'>
                    <button>Diaper</button>
                    <button>Feeds</button>
                    <button>Sleep</button>
                </div>
                <div className='chart'></div>
            </div>
        </div>
    )
}

export default Charts;
import React from 'react';
import { NavLink } from 'react-router-dom';

import './SplashPage.css';

const SplashPage = ()  => {
    return (
        <div className='splash-page-container'>            
            <h1 className='splash-page-h1'>Welcome to baby Trainer!™</h1> 
            <ul>
                <NavLink to='/login' exact={true} activeClassName='active'>
                    <li className='splash-page-btn'>
                            Login
                    </li>
                </NavLink>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    <li className='splash-page-btn'>
                            Sign Up
                    </li>
                </NavLink>
                <li className='splash-page-btn demo-btn'>
                    <button>Demo Login</button>
                </li>
            </ul>
                     
            
        </div>
    )
}

export default SplashPage
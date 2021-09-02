import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';


import { login } from '../../store/session';
import LoginFormModal from '../LoginFormModal/LogInFormModal';
import SignUpFormModal from '../LoginFormModal/SignUpFormModal';
import './SplashPage.css';

const SplashPage = ()  => {
    const dispatch = useDispatch();
    const history = useHistory();

    const demoLogin = async () => {
        await dispatch(login('demo@aa.io', 'password'))
        history.push('/home')
    }

    return (
        <div className='splash-page-container'>            
            <h1 className='splash-page-h1'>Welcome to baby Trainer!™</h1> 
            <ul>
                
                <LoginFormModal/>
                <SignUpFormModal/>                
                <li className='splash-page-btn demo-btn'>
                    <button onClick={demoLogin}>Demo Login</button>
                </li>
            </ul>
                {/* <p className='blurb'>This app helps you keep track of your babies activities. Parents lives are already hard enough with
                    the sleep deprivation. Hopefully Baby Trainer will help yopu get a handle of things</p>   */}
                    <div className='footer'>
                        <a href='https://www.linkedin.com/in/leslie-owiti-0b447952/' target='target=“_blank"' >LinkedIn</a>
                        <a href='https://github.com/leslieowititech/Baby_Trainer' target='target=“_blank"'>GitHub</a>
                        <h2 className='footer-text'>Built by Leslie Owiti</h2>
                        
                    </div>  
            
        </div>
    )
}

export default SplashPage
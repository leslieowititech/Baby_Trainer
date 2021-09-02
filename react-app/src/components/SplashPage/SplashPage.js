import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';


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
                     
            
        </div>
    )
}

export default SplashPage
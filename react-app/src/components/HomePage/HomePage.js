import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

import LogItemDiv from '../LogItemDiv/LogItemDiv';
import DropDown from '../BabyDropDown/BabyDropDown';
<<<<<<< HEAD
import BabyForm from '../Forms/BabyForm';
// import BabyForm from '../Forms/BabyForm'
=======
// import BabyForm from '../Forms/BabyForm';
// import BabyForm from '../Forms/BabyForm';
>>>>>>> c47adea934b4691f0dbbb9d32d90e8860a9064fb

import './HomePage.css';


const HomePage = () => {

    const [showBabyForm, setShowBabyForm] = useState(false);  

    return (
        <div className='home-page-container'>
            {/* {showBabyForm && <BabyForm setShowBabyForm={setShowBabyForm}/>} */}
           <div className='nav-bar'>
              
                <DropDown setShowBabyForm={setShowBabyForm} showBabyForm={showBabyForm}/>
                <LogoutButton/>           
           </div>
           <div className='loggging-div'>
                <LogItemDiv title='Sleep'/>
                <LogItemDiv title='Feed'/>
                <LogItemDiv title='Diaper'/>
           </div>
           <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>⚙</button>
           </NavLink>
        </div>
    )
}

export default HomePage
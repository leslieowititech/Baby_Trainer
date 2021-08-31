import React from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import LogoutButton from '../auth/LogoutButton';

import LogItemDiv from '../LogItemDiv/LogItemDiv';
import DropDown from '../BabyDropDown/BabyDropDown';


import './HomePage.css';



const HomePage = () => {    
     const {babyId } = useParams();
  
     // console.log(babyId, 'idhereee____________')
     const mooniconUrl = 'https://i.pinimg.com/originals/aa/a7/0b/aaa70bf7eb3dd1b3011ad60c229f5fbd.jpg'
    return (
        <div className='home-page-container'>
          
           <div className='nav-bar'>
              
                <DropDown />
                <LogoutButton/>           
           </div>
           <div className='loggging-div'>                
                    <LogItemDiv title='Sleep' imgUrl={mooniconUrl}/>                  
                    <LogItemDiv  title='Feed' option1='Bottle' option2='Breast'/>
                    <LogItemDiv title='Diaper' option1='Poo' option2='Pee'/>
           </div>
           <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>⚙</button>
           </NavLink>
        </div>
    )
}

export default HomePage
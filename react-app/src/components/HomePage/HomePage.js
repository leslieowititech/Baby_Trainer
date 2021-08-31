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
     const mooniconUrl = 'https://image.flaticon.com/icons/png/512/702/702471.png';
     const bottleUrl = 'https://image.flaticon.com/icons/png/512/4292/4292086.png';
     const diaperUrl = 'https://image.flaticon.com/icons/png/512/2336/2336358.png';
     const breastFeedUrl = 'https://image.flaticon.com/icons/png/512/4150/4150402.png';
    
    return (
        <div className='home-page-container'>
          
           <div className='nav-bar'>
              
                <DropDown />
                <LogoutButton/>           
           </div>
           <div className='loggging-div'>                
                    <LogItemDiv title='Sleep' imgUrl={mooniconUrl}/>                  
                    <LogItemDiv  title='Feed' imgUrl={bottleUrl} icon1={bottleUrl} icon2={breastFeedUrl} option1='Bottle' option2='Breast'/>
                    <LogItemDiv title='Diaper' imgUrl={diaperUrl} option1='Poo' option2='Pee'/>
           </div>
           <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>⚙</button>
           </NavLink>
        </div>
    )
}

export default HomePage
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LogItemDiv from '../LogItemDiv/LogItemDiv';
import DropDown from '../BabyDropDown/BabyDropDown';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';


import './HomePage.css';
import { findBabies } from '../../store/baby';


const HomePage = () => {   
     const babies = useSelector(state => state.babies);
     const babyData = Object.values(babies);
     const { babyId } = useParams();
     const dispatch = useDispatch(); 
     // console.log(babyId, '___________homepage')
     
     // const mooniconUrl = 'https://image.flaticon.com/icons/png/512/702/702471.png';
     const bottleUrl = 'https://image.flaticon.com/icons/png/512/4292/4292086.png';
     // const diaperUrl = 'https://image.flaticon.com/icons/png/512/2336/2336358.png';
     const breastFeedUrl = 'https://image.flaticon.com/icons/png/512/4150/4150402.png';

     const [logMessage, setLogMessage] = useState('Please select a baby to start logging');

     if(babyData){
          babyData.pop()
     }

     
     useEffect(() => {
          if (babyId) {
               const [babyBeingLogged] = babyData.filter(baby => {
                    return baby.id === +babyId
               })

               setLogMessage(`Now logging for baby: ${babyBeingLogged?.name}`)

          }
     },[babyData])
     const checkBabySelection = () => {
          if(!babyId){
               alert('please select a baby')
          }
     }

     useEffect(() => {
          dispatch(findBabies())
     },[dispatch])
    
    return (
        <div className='home-page-container'>
          
           <div className='nav-bar'>
              
                <DropDown />
                <LogoutButton/>           
           </div>
           <h1 className='log-message'>{logMessage}</h1>
           <div className='loggging-div'>                
                    {/* <LogItemDiv title='Sleep' imgUrl={mooniconUrl}/>                   */}
                    <LogItemDiv  title='Feed' imgUrl={bottleUrl} icon1={bottleUrl} icon2={breastFeedUrl} option1='Bottle' option2='Breast' logType='Feed log' />
                    {/* <LogItemDiv title='Diaper' imgUrl={diaperUrl} icon1={diaperUrl} icon2={diaperUrl} option1='Poo' option2='Pee' logType='Diaper Log'/> */}
           </div>
           <div className='view-charts-btn-div'>
               <NavLink to='/babies/view/charts'>
                    <button className='view-charts-btn'>View Charts</button>
               </NavLink>
           </div>
           <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>⚙</button>
           </NavLink>  
           <NavLink to='/logs/edit'>
                view/edit a log?
          </NavLink>         
        </div>
    )
}

export default HomePage
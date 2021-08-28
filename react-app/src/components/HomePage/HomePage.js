import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import LogItemDiv from '../LogItemDiv/LogItemDiv';
import DropDown from '../BabyDropDown/BabyDropDown';
import './HomePage.css'
import * as babyActions from '../../store/baby';

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const babies = useSelector(state => state.babies)
    
   
    useEffect(() => {
        dispatch(babyActions.findBabies())
    },[dispatch])

    return (
        <div className='home-page-container'>
           <div className='nav-bar'>
                {/* Hello from home page */}
                <DropDown/>
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
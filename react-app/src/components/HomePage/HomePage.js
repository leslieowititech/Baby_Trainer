import React, {useEffect, useState} from 'react';
// import BabyForm from '../forms/BabyForm';
// import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import LogItemDiv from '../LogItemDiv/LogItemDiv';
import DropDown from '../BabyDropDown/BabyDropDown';
import BabyForm from '../Forms/BabyForm';


import './HomePage.css'
// import * as babyActions from '../../store/baby';

const HomePage = () => {
    // const dispatch = useDispatch()
    const [showBabyForm, setShowBabyForm] = useState(false);

    // const user = useSelector(state => state.user)

    // useEffect(() => {
    //     dispatch(babyActions.addBaby(user.id))
    // },[])

    return (
        <div className='home-page-container'>
            {showBabyForm && <BabyForm setShowBabyForm={setShowBabyForm}/>}
           <div className='nav-bar'>
              
                <DropDown setShowBabyForm={setShowBabyForm} showBabyForm={showBabyForm}/>
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
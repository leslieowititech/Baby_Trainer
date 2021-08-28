import React, {useState} from 'react';
// import BabyForm from '../forms/BabyForm';
// import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';

import LogItemDiv from '../LogItemDiv/LogItemDiv';
import DropDown from '../BabyDropDown/BabyDropDown';
import BabyForm from '../Forms/BabyForm';


import './HomePage.css'
// import * as babyActions from '../../store/baby';

const HomePage = () => {
    const [showBabyForm, setShowBabyForm] = useState(false)

    return (
        <div className='home-page-container'>
            {showBabyForm && <BabyForm/>}
           <div className='nav-bar'>
                {/* Hello from home page */}
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
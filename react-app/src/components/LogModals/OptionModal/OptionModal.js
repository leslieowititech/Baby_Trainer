import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './OptionModal.css';
import { Modal } from '../../../context/Modal';
import TimerModal from '../TimerModal/TimerModal';
import BottleModal from '../BootleModal';
import { addADiaper } from '../../../store/diaper';

const OptionModal = ({ option1, option2, icon1, icon2, logType, modalState}) => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const currentBaby = useSelector(state => state.currentBaby);

    const handleClick = (e) => {
      
        if (logType === 'Feed log'){            
            setShowModal(true)           
            if(e.target.className.includes('bottle')){
                setType('bottle')
                
            }else if(e.target.className.includes('breast')){
                setType('breast')
            }
        } else if (logType === 'Diaper Log'){
            if(e.target.className.includes('pee')){
                setType('pee')
                modalState = false
            }else if(e.target.className.includes('poo')){
                setType('poo')
                modalState = false
            }
        }
        
    }
    
    const date = new Date();
    const [year, month, day, hour, minute,seconds] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
   
    
    useEffect(() => {
        if(type === 'pee' || type === 'poo'){
            const payload = {
                type,
                user_id: user.id,
                baby_id: currentBaby.id,
                change_time: new Date().toDateString()
            }
            // '2017-09-05 18:45:28'

            dispatch(addADiaper(payload))
            alert('Diaper Change is logged go to view logs to see it or edit it')
           
        }
    },[type, dispatch, user, currentBaby, day, year, month, hour, minute, seconds])
   
    
    

    return (
        <div className='option-modal-container'>
            
            <h2 className='option-modal-logType' >
                 {logType}
            </h2>
            <div 
                className='option-modal-item bottle poo' 
                onClick={handleClick}
                >
                <div className='option-modal-icon-container bottle poo' onClick={handleClick}>
                    <img src={icon1} alt={icon1} className='option-modal-image bottle poo' onClick={handleClick}/>
                </div>
                {option1}
            </div>
            {showModal && type === 'breast' &&(
                <Modal onClose={() => setShowModal(false)}>
                    <TimerModal type={type} setShowModal={setShowModal}/>
                </Modal>
            )}
            <span>or</span>
            <div 
                className='option-modal-item'
                onClick={handleClick}
                >
                <div className='option-modal-icon-container breast pee'>
                    <img src={icon2} alt={icon2} className='option-modal-image breast pee'/>
                </div>
                {option2}
            </div>
        </div>
    )
}

export default OptionModal;
import React, {useState, useEffect} from 'react';

import './OptionModal.css';
import { Modal } from '../../../context/Modal';
import TimerModal from '../TimerModal/TimerModal';

const OptionModal = ({option1, option2, icon1, icon2, logType}) => {
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('');

    const handleClick = (e) => {
      
        if (logType === 'Feed log'){            
            setShowModal(true)           
            if(e.target.className.includes('bottle')){
                setType('bottle')
            }else if(e.target.className.includes('breast')){
                setType('breast')
            }
        } 
        
    }

    
    
   
    
    
   

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
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TimerModal type={type}/>
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
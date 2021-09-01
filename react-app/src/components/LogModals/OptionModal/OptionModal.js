import React, {useState, useRef} from 'react';

import './OptionModal.css';
import { Modal } from '../../../context/Modal';
import TimerModal from '../TimerModal/TimerModal';

const OptionModal = ({option1, option2, icon1, icon2, logType}) => {
    const [showModal, setShowModal] = useState(false);
    const myRef = useRef(null)

    const handleClick = (e) => {
        let classes;
        if (logType === 'Feed log'){
            classes = e.target.className;
            setShowModal(true)        
           

        } else if (logType === 'Diaper Log'){
            
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
                <div className='option-modal-icon-container bottle poo' >
                    <img src={icon1} alt={icon1} className='option-modal-image bottle poo' />
                </div>
                {option1}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TimerModal/>
                </Modal>
            )}
            <span>or</span>
            <div 
                className='option-modal-item'
                onClick={handleClick}
                >
                <div className='option-modal-icon-container'>
                    <img src={icon2} alt={icon2} className='option-modal-image'/>
                </div>
                {option2}
            </div>
        </div>
    )
}

export default OptionModal;
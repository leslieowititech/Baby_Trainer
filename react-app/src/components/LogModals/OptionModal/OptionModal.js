import React from 'react';

import './OptionModal.css'

const OptionModal = ({option1, option2, icon1, icon2}) => {
    return (
        <div className='option-modal-container'>
            <div className='option-modal-item'>
                <div className='option-modal-icon-container'>
                    <img src={icon1} alt={icon1} className='option-modal-icon-container'/>
                </div>
                {option1}
            </div>
            <span>or</span>
            <div className='option-modal-item'>
                <div className='option-modal-icon-container'>
                    <img src={icon2} alt={icon2} className='option-modal-image'/>
                </div>
                {option2}
            </div>
        </div>
    )
}

export default OptionModal;
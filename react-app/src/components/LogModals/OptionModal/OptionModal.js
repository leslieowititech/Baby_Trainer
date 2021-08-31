import React from 'react';

import './OptionModal.css'

const OptionModal = ({option1, option2, icon1, icon2}) => {
    return (
        <div className='option-modal-container'>
            <div className='option-modal-item'>
                <img src={icon1} alt={icon1}/>
                {option1}
            </div>
            <span>or</span>
            <div className='option-modal-item'>
                <img src={icon2} alt={icon2}/>
                {option2}
            </div>
        </div>
    )
}

export default OptionModal;
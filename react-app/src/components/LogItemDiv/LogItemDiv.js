import React, {useState} from 'react';

import './LogItemDiv.css';
import { Modal } from '../../context/Modal';
import OptionModal from '../LogModals/OptionModal/OptionModal';

const LogItemDiv = ({title, imgUrl, option1, option2, icon1, icon2}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <div className='log-item' onClick={() => setShowModal(true)}>
            <h2 className='log-item-title'>
                {title}
            </h2>
            <div className='icon'>
                <img src={imgUrl} alt={imgUrl}/>
            </div>
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <OptionModal option1={option1} option2={option2} icon1={icon1} icon2={icon2}/>
            </Modal>
        )}
        </>
    )
}

export default LogItemDiv
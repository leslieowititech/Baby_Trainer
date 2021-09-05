import React, {useState} from 'react';
import { useParams } from 'react-router';

import './LogItemDiv.css';
import { Modal } from '../../context/Modal';
import OptionModal from '../LogModals/OptionModal/OptionModal';

const LogItemDiv = ({title, imgUrl, option1, option2, icon1, icon2, logType}) => {
    const [showModal, setShowModal] = useState(false);
   const { babyId } = useParams()
//  console.log(babyId, '_________logdivItem')
    return (
        <>
        <div className='log-item' onClick={babyId ? () => setShowModal(true) : () => alert('Please select a baby to start loggging')}>
            <div className='icon-container '>
                <img src={imgUrl} alt={imgUrl} className='icon-image'/>
            </div>
            <h2 className='log-item-title'>
                {title}
            </h2>
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>                
                    <OptionModal 
                                option1={option1} 
                                option2={option2} 
                                icon1={icon1} 
                                icon2={icon2} 
                                logType={logType}
                                modalState={showModal}                                                              
                    />
                    
            </Modal>
        )}
        </>
    )
}

export default LogItemDiv
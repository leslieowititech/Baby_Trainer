import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';


const ForgotandEditModal = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>forgot/edit a log?</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>

                </Modal>
            )}
        </>
    )
}

export default ForgotandEditModal;
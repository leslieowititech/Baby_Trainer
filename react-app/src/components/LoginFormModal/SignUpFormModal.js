import React, { useState } from 'react';


import { Modal } from '../../context/Modal';
import SignUpForm from '../auth/SignUpForm';
import './LogInFormModal.css';

const SignUpFormModal = () => {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button onClick={() => setShowModal(true)} className='auth-btn'>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm/>
                </Modal>
            )}
        </>
    )
}

export default SignUpFormModal;
import React, { useState } from 'react';


import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import './LogInFormModal.css'

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='auth-btn' >Login</button>
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                <LoginForm/>
            </Modal> 
            }
        </>
    )
}

export default LoginFormModal;
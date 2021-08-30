import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBabyForm from '../BabyForms/AddBabyForm';


const AddBabyFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='add-baby-btn' >{'Add a Baby'} &#43;</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddBabyForm/>
                </Modal>
            )}
        </>
    )
}

export default AddBabyFormModal;
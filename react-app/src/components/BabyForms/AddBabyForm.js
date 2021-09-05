import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addBaby } from '../../store/baby';
import './AddBabyForm.css'


const AddBabyForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        
        if(name.length === 0){
            errors.push('Name cannot be 0 characters')
        }else{
            dispatch(addBaby(name, birthday, user.id))
            alert('Baby had been added you can now select your baby and start logging!! :)')
        }
        

    }
    return (
        <form onSubmit={handleSubmit} className='add-baby-form'>
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
            <h2 className='add-baby-title'>Welcome let's add your baby</h2>
            <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    type='text'
                    className='add-baby-input'
                    required
                    placeholder={`Enter your baby's name here`}
                    />
            <input 
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    name='birthday'
                    type='date'
                    className='add-baby-input'
                    required
                    />
            <button type='submit' className='add-baby-save-btn add-baby-input'>Save</button>
        </form>
    )
}

export default AddBabyForm

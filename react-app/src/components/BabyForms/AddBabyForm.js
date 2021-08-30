import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBaby } from '../../store/baby';


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

        }
        

    }
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
            <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    type='text'
                    />
            <input 
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    name='birthday'
                    type='date'
                    />
            <button type='submit'>Save</button>
        </form>
    )
}

export default AddBabyForm

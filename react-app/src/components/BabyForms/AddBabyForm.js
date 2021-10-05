import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addBaby } from '../../store/baby';
import './AddBabyForm.css'


const AddBabyForm = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const editForm = document.getElementById(`add-baby-1`)
        
            const data = await dispatch(addBaby(name, birthday, user.id))
            if(!data.ok){
                setErrors(data)
            }else{
                // console.log('why___________00000')
                if (editForm.style.visibility === 'visible') {
                    editForm.style.visibility = 'hidden'
                    editForm.style.display = 'none'
                } else if (editForm.style.visibility === 'hidden') {
                    editForm.style.visibility = 'visible'
                    editForm.style.display = 'flex'
                }
                
                alert('Baby had been added you can now select your baby and start logging!! :)')
            }
        
        

    }
    console.log(errors, 'errors')

    useEffect(() => {
        const errorMessages = document.getElementById('errors')
        if(errors.length){
            errorMessages.style.visibility = 'visible'
            errorMessages.style.display = 'flex'
        }
    }, [errors])
    return (
       

<form style = {{ visibility: 'hidden', display: 'none'}} onSubmit={handleSubmit} id='add-baby-1' className='add-baby-form' >
            

            <div className='errors' id='errors' style={{ visibility: 'hidden', display: 'none' }}>
                    {errors.length && errors?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            
            
            
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

import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import './BabyForm.css';
import * as babyActions from '../../store/baby';


const BabyForm = () => {
    
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();   
       
        dispatch(babyActions.addBaby(name, birthday, user.id));
            
      
    }
    

    return (
        <div className='baby-form-container'>
            <form className='baby-form' onSubmit={handleSubmit}>
                <h2 className='form-title'>Lets add your baby!</h2>
                <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className='baby-form-input'
                        placeholder="Enter baby's name"
                        name='name'
                ></input>
                <input 
                    value={birthday} 
                    onChange={(e) => setBirthday(e.target.value)} 
                    className='baby-form-input'
                    placeholder="Enter baby's birthday"
                    name='birthday'
                    type='date'
                ></input>  
                <button className='form-btn' type='submit'>Save</button>
            </form>
        </div>
    )
}

export default BabyForm;
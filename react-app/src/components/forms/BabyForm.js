import React, {useState} from 'react';

import './BabyForm.css'


const BabyForm = () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');

    return (
        <div className='baby-form-container'>
            <form className='baby-form'>
                <h2 className='form-title'>Lets add your baby!</h2>
                <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className='baby-form-input'
                        placeholder="Enter baby's name"
                ></input>
                <input 
                    value={birthday} 
                    onChange={(e) => setBirthday(e.target.value)} 
                    className='baby-form-input'
                    placeholder="Enter baby's birthday"
                ></input>
                    
                <button className='form-btn'>Save</button>
            </form>
        </div>
    )
}

export default BabyForm
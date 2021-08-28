import React, {useState} from 'react';

import './BabyForm.css'


const BabyForm = () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());

    return (
        <div className='baby-form-container'>
            <form className='baby-form'>
                <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className='baby-form-input'
                ></input>
                <input 
                    value={birthday} 
                    onChange={(e) => setBirthday(e.target.value)} 
                    className='baby-form-input'></input>
                <button >Save</button>
            </form>
        </div>
    )
}

export default BabyForm
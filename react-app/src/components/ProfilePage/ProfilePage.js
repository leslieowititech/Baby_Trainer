import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as babyActions from '../../store/baby';
import './ProfilePage.css';
import LogoutButton from '../auth/LogoutButton';
import AddBabyForm from '../BabyForms/AddBabyForm';
import { setCurrentBaby } from '../../store/currentBaby';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const things = Object.values(useSelector(state => state.babies));
    const babies = things.filter(things => things?.user_id === user.id);

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());

    const handleEditState = (e, id) => {
        e.preventDefault()
        const editForm = document.getElementById(`baby-info-edit-${id}`);
        if(editForm.style.visibility === 'visible'){
            editForm.style.visibility = 'hidden'
            editForm.style.display = 'none'
        }else if(editForm.style.visibility === 'hidden'){
            editForm.style.visibility = 'visible'
            editForm.style.display = 'flex'
        }

    }

    const handleSetBaby = (payload) => {
        dispatch(setCurrentBaby(payload))
    }

    const deleteSpecificBaby = (id) => {
        dispatch(babyActions.deleteABaby(id)) 
    }

    const payload = {
        name,
        birthday,
        user_id: user.id
    }
    const editSpecificBaby = (e, id) => {
        e.preventDefault()
        dispatch(babyActions.editABaby(payload, id))
        handleEditState(e,id)
    }

    const handleAddBaby = (e) => {
        e.preventDefault()
        const babyForm = document.getElementById(`add-baby`)
        const editForm = document.getElementById(`add-baby-1`)
        editForm.style.visibility = 'visible'
        editForm.style.display = 'flex'
        if(babyForm.style.visibility === 'hidden'){
            babyForm.style.visibility = 'visible'
            babyForm.style.display = 'flex'
        }
    }

    const handleCancel = (e) => {
        e.preventDefault()
        const babyForm = document.getElementById(`add-baby`)
        babyForm.style.visibility = 'hidden'
        babyForm.style.display = 'none'
    }

    useEffect(() => {
        dispatch(babyActions.findBabies())
    }, [dispatch])
    return (
        <div className='profilepage-container'>
            <div className='nav-bar'>
                <NavLink to='/home' className='home-link'>Home</NavLink>
                <LogoutButton/>
            </div>
            <div className='user-info'>
                <div className='circle'></div>
                {user?.username}
            </div>
                <div className='baby-title'>
                    <h2>My Babies</h2>
                     
                </div>
            <div className='babies-info-container'>
                <div >
                    {babies?.map(baby => (
                        <div key={baby.id} >
                            <NavLink to='/logs/edit' className='link-to-logs-page' onClick={() => handleSetBaby(baby)}>
                                <div className='baby-info-card' id={`baby-info-${baby.id}`}>
                                        <div className='info-item'>Baby name: {baby.name}</div>
                                        <div className='info-item'>Birthday: {baby.birthday}</div>
                                </div>  
                            </NavLink>
                            <form
                                onSubmit={(e) => editSpecificBaby(e, baby.id)}
                                className='baby-info-card'
                                id={`baby-info-edit-${baby.id}`}
                                style={{ visibility: 'hidden', display: 'none' }}
                            >
                                <label htmlFor='baby-name'>Baby Name</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id='baby-name'
                                    name='name'
                                    className='profile-page-form-input diaper-log-input-box'
                                    placeholder={baby.name}

                                />
                                <label htmlFor='baby-birthday'>Baby Birthday</label>
                                <input
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    name='birthday'
                                    id='baby-birthday'
                                    type='date'
                                    className='profile-page-form-input diaper-log-input-box'

                                />
                                <button type='submit' className='logs-save-btn'>Save</button>
                            </form>
                            <div >
                                <button 
                                        className='util-btn edit-btn' 
                                        onClick={(e) => handleEditState(e, baby.id)}                                      
                                >Edit</button>
                                <button 
                                        onClick={() => deleteSpecificBaby(baby.id) } 
                                    className='util-btn delete-btn'>Delete</button>
                            </div>                         
                        </div>
                    ))}
                </div>

                <div style={{ visibility: 'hidden', display: 'none' }} id='add-baby' className='add-baby-container'>
                    <button className='cancel-button' onClick={handleCancel}>❌</button>
                    <AddBabyForm />
                </div>
                <button className='homepage-add-a-baby-btn'
                        onClick={handleAddBaby}
                >Add a Baby ➕</button>
            </div>

        </div>
    )
}

export default ProfilePage;
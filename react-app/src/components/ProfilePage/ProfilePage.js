import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as babyActions from '../../store/baby';
import './ProfilePage.css';
import LogoutButton from '../auth/LogoutButton';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const things = Object.values(useSelector(state => state.babies));
    const babies = things.filter(things => things?.user_id === user.id);

    const [editmode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState(new Date());

  

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
            <div className='user-babies-info'>
                <div >
                    {babies?.map(baby => (
                        <div key={baby.id} className='baby-item-details'>
                            <div className='baby-info'>
                                {!editmode && 
                                        <>
                                            <div className='info-item'>Baby name: {baby.name}</div>
                                            <div className='info-item'>Birthday: {baby.birthday}</div>
                                        </>
                                
                                }
                                {editmode && 
                                
                                    <form 
                                            onSubmit={(e) => editSpecificBaby(e, baby.id)}
                                            className='profile-page-form'
                                            >
                                        <input 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                name='name'
                                                className='profile-page-form-input'
                                                placeholder={baby.name}

                                                />
                                        <input
                                                value={birthday}
                                                onChange={(e) => setBirthday(e.target.value)}
                                                name='birthday'
                                                type='date'
                                                className='profile-page-form-input'

                                        />
                                        <button type='submit'>Save</button>
                                    </form>
                                }

                               
                            </div>  
                            <div className='baby-buttons'>
                                <button 
                                        className='util-btn edit-btn'
                                        onClick={editmode ? () => setEditMode(false) : () => setEditMode(true)}
                                        >&#9998;</button>
                                <button 
                                        onClick={() => deleteSpecificBaby(baby.id) } 
                                        className='util-btn delete-btn'>&#128465;</button>
                            </div>                         
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProfilePage;
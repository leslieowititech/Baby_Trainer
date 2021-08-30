import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as babyActions from '../../store/baby';
import { editABaby } from '../../store/baby';
import './ProfilePage.css';
import LogoutButton from '../auth/LogoutButton';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const things = Object.values(useSelector(state => state.babies));
    const babies = things.filter(things => things?.user_id === user.id);

    const deleteSpecificBaby = (id) => {
        dispatch(babyActions.deleteABaby(id)) 
    }

    const editSpecificBaby = (e, baby, id) => {
        e.preventDefault();
        dispatch(babyActions.editABaby(baby, id))
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
                                <div className='info-item'>Baby name: {baby.name}</div>
                                <div className='info-item'>Birthday: {baby.birthday}</div>
                                <form onSubmit={(e) => editSpecificBaby(e,baby, baby.id)}>
                                    <input 
                                        name='name'
                                        placeholder={baby.name}/>
                                    <input 
                                        name='birthday'
                                        type='date'/>
                                    <button type='submit' onClick={editABaby}>Save</button>
                                </form>
                            </div>  
                            <div className='baby-buttons'>
                                <button className='util-btn edit-btn'>&#9998;</button>
                                <button onClick={() => deleteSpecificBaby(baby?.id)} className='util-btn delete-btn'>&#128465;</button>
                            </div>                         
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProfilePage;
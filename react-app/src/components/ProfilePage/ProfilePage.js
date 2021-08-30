import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

import * as babyActions from '../../store/baby';
// import { editABaby } from '../../store/baby';
import './ProfilePage.css';
import LogoutButton from '../auth/LogoutButton';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const things = Object.values(useSelector(state => state.babies));
    const babies = things.filter(things => things?.user_id === user.id);    
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [idtoEdit, setIdtoEdit] = useState(0)
    // const [nametoEdit, setNametoEdit] = useState('')
    

    const babyIamEditing = async (e,id) => {
        e.preventDefault()
        const [myBaby] = babies.filter(el => el.id === id)
        console.log(myBaby, 'testing____________Here')

        // await dispatch(babyActions.editABaby(payload,id))
        
    }

    const deleteSpecificBaby = (id) => {
        dispatch(babyActions.deleteABaby(id)) 
    }

    const editButtonFn = (id) => {
        if(editMode){
           setEditMode(false)
        }else{
            setEditMode(true)
        }

        setIdtoEdit(id)
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
                    <h2 className='title-my-babies'> My Babies</h2>
                     
                </div>
            <div className='user-babies-info'>
                <div >
                    {babies?.map((baby, index) => (
                        <div key={baby.id} className='baby-item-details'>
                            <div className='baby-info'>
                                {
                                    <>
                                    <div className='info-item'>Baby name: {baby.name}</div>
                                    <div className='info-item'>Birthday: {baby.birthday}</div>
                                    </>
                                }
                                {/* <ul>
                                    {errors?.map((err, index) => <li key={index}>{err}</li>)}
                                </ul> */}
                                {editMode &&  idtoEdit === baby.id &&
                                
                                    <form onSubmit={(e) => babyIamEditing(e, baby.id)} className='profile-edit-baby-form'>
                                        <input 
                                            name='name'                                           
                                            defaultValue={baby.name} 
                                            className='input-fld'
                                            // value={name}
                                            // onChange={(e) => setName(e.target.value)}
                                            />
                                        <input 
                                            name='birthday'
                                            type='date'
                                            defaultValue={baby.birthday}                                          
                                        className='input-fld'/>
                                    <button type='submit' className='input-fld save-btn'>Save</button>
                                    </form>
                                }
                            </div>  
                            <div className='baby-buttons'>
                                <button className='util-btn edit-btn' onClick={() => editButtonFn(baby.id)}>&#9998;</button>
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
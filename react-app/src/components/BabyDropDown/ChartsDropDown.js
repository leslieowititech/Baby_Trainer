import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import AddBabyFormModal from '../LoginFormModal';
import * as babyActions from '../../store/baby';
import './BabyDropDown.css'

const ChartsDropDown = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const things = Object.values(useSelector(state => state.babies));
    const babies = things.filter(things => things?.user_id === user.id);
    const [info, setInfo] = useState('Add a baby');
    const [isClicked, setClicked] = useState(false);




    useEffect(() => {
        if (babies.length) {
            setInfo('Select a Baby')
        }
    }, [babies.length])


    useEffect(() => {
        dispatch(babyActions.findBabies())
    }, [dispatch])



    return (
        // <Dropdown options={() => options2()} value={defaultOption} placeholder="Select a baby" />
        <div className='dropdown-container'>
            <div className='dropdown-btn ' onClick={isClicked ? () => setClicked(false) : () => setClicked(true)}>{info} &#x25BC;</div>
            {isClicked &&

                <div className='dropdown-items'>
                    {babies.map(baby => (
                        <NavLink key={baby.id} to={`/view/chart/${baby.id}`}>
                            <li className='drop-down-list-item'>{baby.name}</li>
                        </NavLink>
                    ))}
                    <AddBabyFormModal />
                </div>
            }
        </div>
    )
}

export default ChartsDropDown;

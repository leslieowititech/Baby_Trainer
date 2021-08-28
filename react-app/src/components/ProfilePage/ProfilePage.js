import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as babyActions from '../../store/baby';

const ProfilePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const things = Object.values(useSelector(state => state.babies));
    const babies = things.filter(things => things?.user_id === user.id);

    useEffect(() => {
        dispatch(babyActions.findBabies())
    }, [dispatch])
    return (
        <div className='profilepage-container'>
            <div className='user-info'></div>
            <div className='user-babies-info'>
                <div className='baby-item'>
                    <h2>My Babies</h2>
                     Icons go here
                </div>
                <div className='baby-item-details'>
                    {babies?.map(baby => (
                        <div>
                            <div>
                                <div>{baby.name}</div>
                                <div>{baby.birthday}</div>
                            </div>  
                            <div>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>                         
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProfilePage;
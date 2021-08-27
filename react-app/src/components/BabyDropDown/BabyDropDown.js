import React, {useEffect} from 'react';
import Dropdown from 'react-dropdown';
import { useSelector, useDispatch } from 'react-redux';

import * as babyActions from '../../store/baby';
import './BabyDropDown.css'

const DropDown = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const babies = useSelector(state => state.babies)

    const options = [
        'one', 'two', 'three'
    ];

    const options2 = () => {
        let arr;
        if(babies.length){
            arr =  babies.filter(baby => {
                return baby.user_id === user.id
            })
            arr = arr.map(baby => baby.ame)
        }else{
            arr = ['Nobabies']
        }
        return arr;
    }
    console.log(options2(), 'options2________')
    const defaultOption = options2()[0];

    useEffect(() => {
        dispatch(babyActions.findBabies())
    }, [dispatch])

    return (
        <Dropdown options={() => options2()} value={defaultOption} placeholder="Select a baby" />
    )
}

export default DropDown;


import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';


import * as babyActions from '../../store/baby';
import './BabyDropDown.css'

const DropDown = ({showBabyForm}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const babies = useSelector(state => state.babies)

    const [info, setInfo] = useState('Add a baby');
    const [isClicked, setClicked] = useState(false);
    // const [babyForm, setBabyForm] = useState(false);

    const options2 = () => {
        let arr;
        if(babies.length){
            arr =  babies.filter(baby => {
                return baby.user_id === user.id
            })
            
        }else{
            arr = []
        }
        return arr;
    }
    

    
    useEffect(() => {
        
        if(options2().length){
            setInfo('Select a Baby')
        }
    })
   

    useEffect(() => {
        dispatch(babyActions.findBabies())
    }, [dispatch])

    return (
        // <Dropdown options={() => options2()} value={defaultOption} placeholder="Select a baby" />
        <div className='dropdown-container'>
            <div className='dropdown-btn ' onClick={isClicked ? () => setClicked(false) : () => setClicked(true)}>{info} &#x25BC;</div>
            {isClicked &&
            
                <div className='dropdown-items'>
                    {options2().map(baby => (
                        <li key={baby.id} className='drop-down-list-item'>{baby.ame}</li>
                    ))}
                <button 
                        className='add-baby-btn'
                        onClick={showBabyForm}
                >{'Add a baby'} &#43;</button>
                </div>
            }
        </div>
    )
}

export default DropDown;


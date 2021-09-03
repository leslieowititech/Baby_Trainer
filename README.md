# Baby Trainer

By Leslie Owiti.

Link to [Live site](https://baby-trainer.herokuapp.com/)

## Baby Trainer at a glance


Baby Trainer is a fullstack app that uses a Flask backend and React on the front end.

Target users are parents with new borns and especially new parents. There is a lot to taking care of a baby and speaking from personal experience it is a lot to try and get a handle on at first time of asking. There is a lot of helpful apps out there and I hope Baby Trainer will add positively to help new moms and dads have a way to manage babies development activities.

## Application Architecture

Baby Trainer is containerized in Docker and uses gihub action to atomatically push to Heroku where it is hosted. The front end is done using a React-redux state management lifecycle. 

# Frontend Overview

The bulk of the app is build using vaniilla React and Redux on the front end. The charts feature and the timer feature that visuallize and record feed dta respectively were implemented using the third party libraries.

### Example component

```
import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import './OptionModal.css';
import { Modal } from '../../../context/Modal';
import TimerModal from '../TimerModal/TimerModal';
import { addADiaper } from '../../../store/diaper';

const OptionModal = ({option1, option2, icon1, icon2, logType}) => {
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const {babyId} = useParams();
    console.log(babyId, '_________babyidHere')

    const handleClick = (e) => {
      
        if (logType === 'Feed log'){            
            setShowModal(true)           
            if(e.target.className.includes('bottle')){
                setType('bottle')
            }else if(e.target.className.includes('breast')){
                setType('breast')
            }
        } else if (logType === 'Diaper Log'){
            if(e.target.className.includes('pee')){
                setType('pee')
            }else if(e.target.className.includes('poo')){
                setType('poo')
            }
        }
        
    }
    // console.log(type, '___________justchecking')
    const date = new Date();
    const [year, month, day, hour, minute,seconds] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
    // console.log(`${year}-${month}-${day} ${hour}:${minute}:${seconds}________format Date`)

    
    useEffect(() => {
        if(type === 'pee' || type === 'poo'){
            const payload = {
                type,
                user_id: user.id,
                baby_id: +babyId,
                change_time: `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
            }
            // '2017-09-05 18:45:28'

            alert('Diaper change logged')
            dispatch(addADiaper(payload))
        }
    },[type, dispatch, user, babyId])
   
    
    
   

    return (
        <div className='option-modal-container'>
            <h2 className='option-modal-logType' >
                 {logType}
            </h2>
            <div 
                className='option-modal-item bottle poo' 
                onClick={handleClick}
                >
                <div className='option-modal-icon-container bottle poo' onClick={handleClick}>
                    <img src={icon1} alt={icon1} className='option-modal-image bottle poo' onClick={handleClick}/>
                </div>
                {option1}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TimerModal type={type} setShowModal={setShowModal}/>
                </Modal>
            )}
            <span>or</span>
            <div 
                className='option-modal-item'
                onClick={handleClick}
                >
                <div className='option-modal-icon-container breast pee'>
                    <img src={icon2} alt={icon2} className='option-modal-image breast pee'/>
                </div>
                {option2}
            </div>
        </div>
    )
}

export default OptionModal;
```

## React-Timer-Hook
The react-timer-hook is awesome at handling time related loging and manipulation. The documentation on this library is very short and to the point and the functionality is very user friendly to parse. I found that this library lent it;'s self very well to my timer component that visually records as you time how long your baby fed for.

## Recharts
Recharts in my opinion is by far the best library out there that I have come across and the documentation on it very extensive and well written. There are a lot of various graphs, charts and other data visualisation tools on it that are very flexible. I love playing around with its functionality and implemented my charts feature using it.

## Figma
I utilised Figma's design tools to wireframe my app before I begun building out my components. I found this practice to be very helpful in visualising the amount of work building the app will approximately take and what kind of tools do I want to build from scratch and where good third party libraries if available can be utilised.

Below is an example of a wireframe workflow i designed in figma to hel me visualize how i wanted this feature to work.

![Feed_flow_logs](	https://mir-s3-cdn-cf.behance.net/project_modules/disp/674f04126687771.6132389abe68a.png)
 
 # Backend Overview
 For the backend I wrote out all my route logic in Blueprits and utilised maintained a similar output for all my endpoints using decorators and all this was done in flask. I normalised my data as mych as posible in the backend to minimise too much nesting when trying to access my data in the fron end.
 
 ## PostgreSQL
 Locally I used PostgreSQL to seed and test my data. The initial set-up of my database I did using raw SQL but from then on I utilised alembic to manage my data. I also want to give a mention to Postman. This tool was very helpful when testing my route logic before making ajax call to my store in the frontend.


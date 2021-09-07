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
Below is am example of how I handled getting all the diaper logs for a particular user. In This case these are diaper logs.

```
import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { getAllDiapers } from '../../store/diaper';
import { deleteADiaper } from '../../store/diaper';
import { editADiaper } from '../../store/diaper';
import { findBabies } from '../../store/baby';
import './DiaperLogs.css'


const DiaperLogs = () => {
    const dispatch = useDispatch();
    const diapers = useSelector(state => state.diapers);
    const user = useSelector(state => state.session.user);
    const babies = useSelector(state => state.babies);
    const userId = user.id;

    const diaperData = Object.values(diapers);
    if (diaperData) {
        diaperData.pop()
    }
    const babyData = Object.values(babies);
    if(babyData){
        babyData.pop()
    }
   
    const userDiaperData = diaperData.filter(diaper => {
        return diaper.user_id === userId
    })
   
    const normaliseData = () => {
        let newData = []
        for(let i = 0 ; i < babyData.length ; i++){
            let baby = babyData[i]
                     
            for(let j = 0 ; j < userDiaperData.length ; j++ ){
                
                let diaper = userDiaperData[j]
                if(diaper.baby_id === baby.id){
                    diaper.babyName = baby.name
                    newData.push(diaper)
                }
            }
        }
        
        return newData
    }
   normaliseData()//add baby names to the diaper log

   const handleEditState = (e, id) => {
        e.preventDefault()
       const editForm = document.getElementById(`diaper-log-edit-${id}`)
        // console.log(editForm, '_____here')
       if(editForm.style.visibility === 'visible'){
           editForm.style.visibility = 'hidden'
           editForm.style.display = 'none'
       }else if(editForm.style.visibility === 'hidden'){
           editForm.style.visibility = 'visible'
           editForm.style.display = 'flex'
       }
   }
 
   const [changeTime, setChangeTime] = useState(new Date());
   const [type, setType] = useState('');

   const payload = {
       type,
       user_id: user.id,
       change_time: changeTime
   }

   const editSpecificDiaper = (e, baby_id, id) => {
       e.preventDefault()
        payload.baby_id = baby_id
        dispatch(editADiaper(payload, id))
        handleEditState(e, id)
   }

    const deleteSpecificDiaper = (id) => {
        dispatch(deleteADiaper(id))
    }

    useEffect(() => {
        dispatch(getAllDiapers())
        dispatch(findBabies())
    }, [dispatch])

    return (
        <div className='diaper-log-contaner'>
            <h1>Diaper Logs 👶</h1>
            <div>
                {userDiaperData?.map(diaperObj => (
                    <div key={diaperObj.id}>
                        <div id={`diaper-log-info-${diaperObj.id}`} className='diaper-log-card'>
                            <h2>
                                {`Baby Name: ${diaperObj.babyName}`}
                            </h2>
                            <h3>
                                {`Diaper change date: ${diaperObj.change_time}`}
                            </h3>
                            <h3>
                                {`Diaper Type: ${diaperObj.type}`}
                            </h3>
                        </div>
                        <form 
                                id={`diaper-log-edit-${diaperObj.id}`} 
                                className='diaper-log-card form' 
                                style={{ visibility: 'hidden', display: 'none' }}
                                onSubmit={(e) => editSpecificDiaper(e, diaperObj.baby_id, diaperObj.id)}
                                >
                            <h2>{`Baby Name: ${diaperObj.babyName}`}</h2>
                            <label htmlFor='change_name' >Change Date:</label>
                            <input 
                                    id='change_time' 
                                    value={changeTime}
                                    onChange={(e) => setChangeTime(e.target.value)}
                                    className='diaper-log-input-box' 
                                    type='date'></input>
                            <label 
                                    htmlFor='diaper-type'>Diaper Type:</label>
                            <input 
                                    id='diaper-type'
                                    value={type} 
                                    onChange={(e) => setType(e.target.value)}
                                    className='diaper-log-input-box'></input>
                            <button 
                                    className='logs-save-btn'>Save</button>
                        </form>
                        <div>
                            <button onClick={(e) => handleEditState(e, diaperObj.id)} className='logs-edit-btn'>Edit</button>
                            <button 
                                    className='logs-delete-btn'
                                    onClick={() => deleteSpecificDiaper(diaperObj.id)}
                                    >Delete</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default DiaperLogs
```

## React-Timer-Hook
The react-timer-hook is awesome at handling time related loging and manipulation. The documentation on this library is very short and to the point and the functionality is very user friendly to parse. I found that this library lent it;'s self very well to my timer component that visually records as you time how long your baby fed for.

## Recharts
Recharts in my opinion is by far the best library out there that I have come across and the documentation on it very extensive and well written. There are a lot of various graphs, charts and other data visualisation tools on it that are very flexible. I love playing around with its functionality and implemented my charts feature using it.
The Charts componet is just a visualisation of your data.
## Figma
I utilised Figma's design tools to wireframe my app before I begun building out my components. I found this practice to be very helpful in visualising the amount of work building the app will approximately take and what kind of tools do I want to build from scratch and where good third party libraries if available can be utilised.

Below is an example of a wireframe workflow i designed in figma to hel me visualize how i wanted this feature to work.

![Feed_flow_logs](	https://mir-s3-cdn-cf.behance.net/project_modules/disp/674f04126687771.6132389abe68a.png)
 
 # Backend Overview
 For the backend I wrote out all my route logic in Blueprits and utilised maintained a similar output for all my endpoints using decorators and all this was done in flask. I normalised my data as mych as posible in the backend to minimise too much nesting when trying to access my data in the fron end.
 
 ## PostgreSQL
 Locally I used PostgreSQL to seed and test my data. The initial set-up of my database I did using raw SQL but from then on I utilised alembic to manage my data. I also want to give a mention to Postman. This tool was very helpful when testing my route logic before making ajax call to my store in the frontend.


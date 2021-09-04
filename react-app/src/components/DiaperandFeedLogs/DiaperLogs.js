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
    const babies = useSelector(state => state.babies)
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

    useEffect(() => {
        dispatch(getAllDiapers())
        dispatch(findBabies())
    }, [dispatch])

    return (
        <div className='diaper-log-contaner'>
            <h1>Diaper Logs :)</h1>
            <div>
                {userDiaperData.map(diaperObj => (
                    <div>
                        <div id={`diaper-log-info-${diaperObj.id}`} className='diaper-log-card'>
                            <h2>
                                {`Baby Name: ${diaperObj.babyName}`}
                            </h2>
                            <h3>
                                {`Diaper change time: ${diaperObj.change_time}`}
                            </h3>
                            <h3>
                                {`Diaper Type: ${diaperObj.type}`}
                            </h3>
                        </div>
                        <form id={`diaper-log-edit-${diaperObj.id}`} className='diaper-log-card form' style={{ visibility: 'hidden', display: 'none' }}>
                            <h2>{`Baby Name: ${diaperObj.babyName}`}</h2>
                            <label htmlFor='change_name'>Change Time:</label>
                            <input id='change_time' className='diaper-log-input-box'></input>
                            <label htmlFor='diaper-type'>Diaper Type:</label>
                            <input id='diaper-type' className='diaper-log-input-box'></input>
                            <button className='logs-save-btn'>Save</button>
                        </form>
                        <div>
                            <button onClick={(e) => handleEditState(e, diaperObj.id)} className='logs-edit-btn'>Edit</button>
                            <button>Delete</button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default DiaperLogs
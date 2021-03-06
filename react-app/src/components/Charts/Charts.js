import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

import LogoutButton from '../auth/LogoutButton';
import './Charts.css';
import { getFeeds } from '../../store/feed';
import DropDown from '../BabyDropDown/BabyDropDown';
import { findBabies } from '../../store/baby';
import { getAllDiapers } from '../../store/diaper';



const Charts = () => {
    const dispatch = useDispatch();
    const currentBaby = useSelector(state => state.currentBaby);
    const feeds = useSelector(state => state.feeds);
    const feedData = Object.values(feeds);
    const babies = useSelector(state => state.babies);
    const babyData = Object.values(babies);

    const diapers = useSelector(state => state.diapers);
    const diaperData = Object.values(diapers);

   

    let displayData;
    
    displayData = feedData.filter(feed => {
        return feed.baby_id === currentBaby.id
    })
    

    let displayDataDiapers;
    displayDataDiapers = diaperData.filter(diaper => {
        return diaper.baby_id === currentBaby.id
    })

   
    let res = [];
    for(let i = 0 ; i< displayDataDiapers.length ; i++){
        let normalisedData = {}
        let diaper = displayDataDiapers[i]
        let currentChangeTime = diaper.change_time
        normalisedData['changeTime']= currentChangeTime
        if(diaper.type === 'poo'){ 
            normalisedData.poo = 1
            normalisedData.pee = 0
        }
        if(diaper.type === 'pee'){ 
            normalisedData.pee = 1
            normalisedData.poo = 0
        }
        for(let j = i + 1 ; j < displayDataDiapers.length; j++){
            let otherDiaper = displayDataDiapers[j]
            let otherDiaperChangeTime = otherDiaper.change_time
            if(otherDiaperChangeTime === currentChangeTime){
                if(otherDiaper.type === 'poo') normalisedData.poo++
                if(otherDiaper.type === 'pee') normalisedData.pee++
            }
        }
        res.push(normalisedData)
    }
  
    

    const [showChart, setShowChart] = useState(false);
    const [showDiaperChart, setshowDiaperChart] = useState(false)
    const [message, setMessage] = useState('');

   
    

    const handleShowFeed = () => {
        if(currentBaby.id){
            setshowDiaperChart(false)
            setShowChart(true)
        }else{
            alert('Plase select a baby')
        }
    }
    const handleShowDiapers = () => {
        if(currentBaby.id){
            setShowChart(false)
            setshowDiaperChart(true)
        }else{
            alert('Please select a baby')
        }
    }
    
   
    
    useEffect(() => {
        if(currentBaby.name){
            setMessage(`Now viewing charts for baby: ${currentBaby.name}`)
        }
    },[currentBaby])

    useEffect(() => {
        dispatch(getFeeds())
    },[dispatch])
    useEffect(() => {
        dispatch(findBabies())
    }, [dispatch])
    useEffect(() => {
        dispatch(getAllDiapers())
    },[dispatch])

    return (
        <div className='charts-container'>
            <div className='nav-bar'>
                <NavLink to='/home' className='home-link'>Home</NavLink>
                <DropDown/>
                <LogoutButton />
            </div>
            <h1>{message}</h1>
            <div className='charts-info'>
                <div className='chart-btns'>
                    <button className='chart-btn' onClick={handleShowDiapers}>Diaper</button>
                    <button className='chart-btn' onClick={handleShowFeed}>Feeds</button>
                    {/* <button className='chart-btn'>Sleep</button> */}
                </div>
                <div className='chart'>
                    <>
                    {!showChart && !showDiaperChart && <h2>&larr; Click one of the left buttons to view a chart</h2>}
                    {showChart && (
                    <ResponsiveContainer>
                        <LineChart width={600} height={300} data={displayData}>
                            <Line type="monotone" dataKey="amount" stroke="#9FCBC4" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="type" />
                            <YAxis />
                        </LineChart>
                    </ResponsiveContainer>
                    )}
                    {showDiaperChart && (
                        <ResponsiveContainer>
                            <BarChart   data={res} margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}>
                                <XAxis dataKey='changeTime'/>
                                <YAxis />
                                <Legend/>
                                <Bar dataKey='pee' fill="#B3EBEF"/>
                                <Bar dataKey='poo' fill="#D1AF9C" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                    </>
                </div>
            </div>
            <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>???</button>
            </NavLink>
        </div>
    )
}

export default Charts;
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useParams } from 'react-router';

import LogoutButton from '../auth/LogoutButton';
import './Charts.css';
import { getFeeds } from '../../store/feed';
import ChartsDropDown from '../BabyDropDown/ChartsDropDown';
import { findBabies } from '../../store/baby';
import { getAllDiapers } from '../../store/diaper';



const Charts = () => {
    const {babyId} = useParams()
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds);
    const feedData = Object.values(feeds);
    const babies = useSelector(state => state.babies);
    const babyData = Object.values(babies);

    const diapers = useSelector(state => state.diapers);
    const diaperData = Object.values(diapers);

    if(diaperData){
        diaperData.pop()
    }

    if (babyData) {
        babyData.pop()
    }

    let displayData;
    if(feedData){
        feedData.pop()
        displayData = feedData.filter(feed => {
            return feed.baby_id === +babyId
        })
    }


    

    const [showChart, setShowChart] = useState(false);
    const [showDiaperChart, setshowDiaperChart] = useState(false)
    const [babyName, setBabyName] = useState('Please select a baby to view records');

   
    

    const handleShowFeed = () => {
        if(babyId){
            setShowChart(true)
        }else{
            alert('Plase select a baby')
        }
    }
    const handleShowDiapers = () => {
        if(babyId){
            setshowDiaperChart(true)
        }else{
            alert('Please select a baby')
        }
    }

   
    useEffect(() => {
        for (let i = 0; i < diaperData.length; i++) {
            let diaper = diaperData[i]
            let res = {}
            if (res.time) {
                console.log(res.time === diaper.change_time, '______________match?')
                console.log(res.time, '________ and________ ', diaper.change_time)
            } else {
                res.time = diaper.change_time
            }
        }
    })
  
    useEffect(() => {
        if (babyId) {
            const [babyBeingLogged] = babyData.filter(baby => {
                return baby.id === +babyId
            })

            setBabyName(`Now viewing charts for baby: ${babyBeingLogged?.name}`)

        }
    }, [babyData, babyId])

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
                <ChartsDropDown/>
                <LogoutButton />
            </div>
            <h1>{babyName}</h1>
            <div className='charts-info'>
                <div className='chart-btns'>
                    {/* <button className='chart-btn' onClick={handleShowDiapers}>Diaper</button> */}
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
                    {/* {showDiaperChart && (
                        <ResponsiveContainer>
                            <BarChart data={diaperData} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
                                <XAxis dataKey='change_time'/>
                                <YAxis />
                                    <Bar dataKey='type' fill="#8884d8"/>
                            </BarChart>
                        </ResponsiveContainer>
                    )} */}
                    </>
                </div>
            </div>
            <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>⚙</button>
            </NavLink>
        </div>
    )
}

export default Charts;
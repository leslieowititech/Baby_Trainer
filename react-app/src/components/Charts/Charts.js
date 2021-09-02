import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useParams } from 'react-router';

import LogoutButton from '../auth/LogoutButton';
import './Charts.css';
import { getFeeds } from '../../store/feed';
import ChartsDropDown from '../BabyDropDown/ChartsDropDown';


const Charts = () => {
    const {babyId} = useParams()
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds);
    const feedData = Object.values(feeds);
    let displayData;
    if(feedData){
        feedData.pop()
        displayData = feedData.filter(feed => {
            return feed.baby_id === +babyId
        })
    }
    

    const [showChart, setShowChart] = useState(false);
    

    const handleShowFeed = () => {
        if(babyId){
            setShowChart(true)
        }else{
            alert('Plase select a baby')
        }
    }
    

    useEffect(() => {
        dispatch(getFeeds())
    },[dispatch])

    return (
        <div className='charts-container'>
            <div className='nav-bar'>
                <NavLink to='/home' className='home-link'>Home</NavLink>
                <ChartsDropDown/>
                <LogoutButton />
            </div>
            <h1>Baby Name</h1>
            <div className='charts-info'>
                <div className='chart-btns'>
                    <button className='chart-btn'>Diaper</button>
                    <button className='chart-btn' onClick={handleShowFeed}>Feeds</button>
                    <button className='chart-btn'>Sleep</button>
                </div>
                <div className='chart'>
                    {showChart && (

                    <LineChart width={600} height={300} data={displayData}>
                        <Line type="monotone" dataKey="amount" stroke="#9FCBC4" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="type" />
                        <YAxis />
                    </LineChart>
                    )}
                </div>
            </div>
            <NavLink to='/users/profile'>
                <button className='settings fas fa-cog'>⚙</button>
            </NavLink>
        </div>
    )
}

export default Charts;
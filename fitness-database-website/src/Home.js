import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './objects';

export default function Home() {
    const navigate = useNavigate();
    const handleLogout = e => {      
        e.preventDefault();
        User.logout()
        navigate('../fitness_database/login');
    };

    const handleWorkoutNavigation = e => {
        navigate('/fitness_database/workout_logs');
    };
    const handleDietNavigation = e => {
        navigate('/fitness_database/diet_logs');
    };
    const handleAchievementsNavigation = e => {
        navigate('/fitness_database/achievements');
    };

    return (
        <div>
            <h1>Fitness Homepage:</h1>
            <h3>User: {User.username}</h3>
            <button onClick={handleLogout}>Logout</button>
            <h3>Navigation</h3>
            <button onClick={handleWorkoutNavigation}>Workout Logs</button>
            <button onClick={handleAchievementsNavigation}>Achievements</button>
            <button onClick={handleDietNavigation}>Diet Logs</button>
        </div>
    );
}
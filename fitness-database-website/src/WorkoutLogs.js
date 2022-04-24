import Axios from 'axios';
import { Button } from 'bootstrap';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './objects';

export default function WorkoutLogs() {
    const navigate = useNavigate();
    const handleLogout = e => {      
        e.preventDefault();
        User.logout();
        navigate('../fitness_database/login');
    };

    const handleNavigation = e => {
        e.preventDefault();
        navigate('../fitness_database/home');
    }

    return (
        <div>
            <h1>{User.username}'s Workout Logs:</h1>
            <button onClick={handleNavigation}>Back to homepage</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './objects';

export default function DietLogs() {
    const navigate = useNavigate();
    const handleLogout = e => {      
        e.preventDefault();
        User.logout()
        console.log(User.username);
        navigate('../fitness_database/login');
    };

    const handleNavigation = e => {
        e.preventDefault();
        navigate('../fitness_database/home');
    }

    return (
        <div>
            <h1>{User.username}'s Diet Logs:</h1>
            <button onClick={handleNavigation}>Back to homepage</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
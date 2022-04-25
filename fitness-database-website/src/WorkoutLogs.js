import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './objects';

export default function WorkoutLogs() {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    

    const handleHomeNav = e => {
        e.preventDefault();
        navigate('../fitness_database/home');
    }

    const handleLogoutNav = e => {
        e.preventDefault();
        User.logout();
        navigate('../fitness_database/login');
    }

     const handleAddWorkoutNav = e => {
         e.preventDefault();
         navigate('../fitness_database/add_workout');
     }


    async function loadWorkoutLogs() {
        
    }

    return (
        <div>
            <h1>{User.username}'s Workout Logs:</h1>
            <button onClick={handleHomeNav}>Back to homepage</button>
            <button onClick={handleLogoutNav}>Logout</button>
            <div className='log'>
                <h3>Logs</h3>
                <button onClick={handleAddWorkoutNav}>Add Workout log</button>
            </div>
        </div>
    );
}
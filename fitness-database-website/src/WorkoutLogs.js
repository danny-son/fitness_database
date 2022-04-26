import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';
import WorkoutLog from './WorkoutLog';

export default function WorkoutLogs() {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [count, setCount] = useState(0);


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

    function handleEdit(key) {
        WorkoutLog.setUp(logs[key].log_id, logs[key].name,
             logs[key].date.slice(0,10), logs[key].description, logs[key].workout_length);
        navigate('../fitness_database/edit_workout_log');
    }

    async function loadWorkoutLogs() {
        const url = "http://localhost:3001/viewWorkoutLogs";
        await Axios.get(url, {
            params: {
                username: User.username
            }
        }).then((response) => {
            setLogs(response.data);
        }).catch(() => {
            console.log('error loading workout logs');
        });
    }

    async function handleDelete(key) {
        const url = "http://localhost:3001/deleteWorkoutLog";
        const id = logs[key].log_id;
        await Axios.delete(url, {
            params: {
                id: id
            }
        }).then(() => {
            loadWorkoutLogs();
        }).catch(() => {
            console.log('error deleting workout log');
        });    
    }

    useEffect(() => {
        if (count == 0) {
            loadWorkoutLogs();
            setCount(count+1);
        }
    });
    return (
        <div>
            <h1>{User.username}'s Workout Logs:</h1>
            <button onClick={handleHomeNav}>Back to homepage</button>
            <button onClick={handleLogoutNav}>Logout</button>
            <div className='log'>
                <h3>Logs</h3>
                <button onClick={handleAddWorkoutNav}>Add Workout log</button>
            </div>
            <div className='log-list'>
                {logs.map((val,key) => {
                    const date = val.date.slice(0,10);
                    return <div className='log-index'>
                        <p>Log id: {val.log_id}</p>
                        <p>Workout: {val.name}</p>
                        <p>Date: {date}</p>
                        <p>Description: {val.description}</p>
                        <p>Duration (mins): {val.workout_length}</p>
                        <button onClick={() => handleEdit(key)}>Edit Log</button> 
                        <button onClick={() => handleDelete(key)}>Delete Log</button>
                    </div>
                })}
            </div>
        </div>
    );
}
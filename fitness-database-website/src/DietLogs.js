import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DietLog from './DietLogObject';
import User from './User';

export default function DietLogs() {
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

    const handleDietLogNav = e => {
        e.preventDefault();
        navigate('../fitness_database/add_diet_log');
    }

    function handleEdit(key) {
        DietLog.setUp(logs[key].log_id, logs[key].date, logs[key].description);
        navigate('../fitness_database/edit_diet_log');
    }

    async function loadWorkoutLogs() {
        const url = "http://localhost:3001/viewAllDietLogs";
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
        const url = "http://localhost:3001/deleteDietLog";
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
            <h1>{User.username}'s Diet Logs:</h1>
             <button onClick={handleHomeNav}>Back to homepage</button>
            <button onClick={handleLogoutNav}>Logout</button>
            <h3>Logs</h3>
            <button onClick={handleDietLogNav}>Add a diet log</button>
            <div className='diet-list'>
                {logs.map((val,key) => {
                    const date = val.date.slice(0,10);
                    return <div className='diet-index'>
                        <p>Diet Id: {val.log_id}</p>
                        <p>Diet Description: {val.description}</p>
                        <p>Date: {date}</p>
                        <p>Meal Description: {val.meal_description}</p>
                        <button onClick={() => handleEdit(key)}>Edit Log</button> 
                        <button onClick={() => handleDelete(key)}>Delete Log</button>
                    </div>
                })}
            </div>
        </div>
        
    );
}
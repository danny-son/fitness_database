import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';
import DietLog from './DietLogObject';

export default function EditDietLog() {
    const navigate = useNavigate();
    const [newDescription, setNewDescription] = useState(DietLog.description);
    const [newDate, setNewDate] = useState(DietLog.date);
    const [error, setError] = useState();

    const handleCancel = () => {
        navigate('../fitness_database/diet_logs');
    }
    const handleSubmit = () => {
        if (newDate && newDescription) {
            const url = "http://localhost:3001/editDietLog";
            Axios.put(url, {
                username: User.username,
                id: DietLog.diet_id,
                date: newDate,
                description: newDescription
            }).then(() => {
                 navigate('../fitness_database/diet_logs');
            }).catch(() => {
                setError('There was an error updating your diet log!');
            })
        } else {
            setError('Fill out all fields!');
        }
    }

    return (<div>
        <h1> Edit a Diet Log</h1>
        <div className='diet-index'>
            <p>Diet id: {DietLog.diet_id}</p>
            <div>
            <label>Date: </label>
            <input type='date' placeholder={DietLog.date} onChange={e => setNewDate(e.target.value)}/>
            </div>
            <div>
            <label>Description: </label>
            <input type='text' placeholder={DietLog.description} onChange={e => setNewDescription(e.target.value)}/>
            </div>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSubmit}>Apply Changes and go back</button>
            {error && <p>{error}</p>}
        </div>
    </div>)

}
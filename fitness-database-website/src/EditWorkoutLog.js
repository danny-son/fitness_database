import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';
import WorkoutLog from './WorkoutLog';

export default function EditWorkoutLog() {
    const navigate = useNavigate();
    const [newDate, setNewDate] = useState(WorkoutLog.date);
    const [newDescription, setNewDescription] = useState(WorkoutLog.description);
    const [newLength, setNewLength] = useState(WorkoutLog.minutes);
    const [error, setError] = useState();
    
    const handleCancel = e => {
        e.preventDefault();
        navigate('../fitness_database/workout_logs');
    }

    const handleSubmit = e => {
        e.preventDefault();
        const url = "http://localhost:3001/updateWorkoutLog";
        Axios.put(url, {
            username: User.username,
            logId: WorkoutLog.log_id,
            description: newDescription,
            date: newDate,
            length: newLength
        }).then(() => {
            navigate('../fitness_database/workout_logs');
        }).catch(() => {
            setError('Could not update log');
        });
    }

    return (
        <div className='edit-workout-main'>
        <h2>Edit your workout!</h2>
        <div className='edit-workout'>
        <p>Log id: {WorkoutLog.log_id}</p>
        <p>Workout name: {WorkoutLog.workout}</p>
        <div>
            <label>Date: </label>
            <input type='date' placeholder={WorkoutLog.date} onChange={e => setNewDate(e.target.value)}/>
        </div>
        <div>
            <label>Description: </label>
            <input type='text' placeholder={WorkoutLog.description} onChange={e => setNewDescription(e.target.value)}/>
        </div>
         <div>
            <label>Duration (minutes): </label>
            <input type='number' placeholder={WorkoutLog.minutes} onChange={e => setNewLength(e.target.value)}/>
        </div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Apply</button>
            </div>
        {error && <p>{error}</p>}
</div>);
}
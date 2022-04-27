import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddMeal() {
    const navigate = useNavigate();
    const [description, setDescription] = useState();
    const [calories, setCalories] = useState();
    const [carbs, setCarbs] = useState();
    const [protein, setProtein] = useState();
    const [fat, setFat] = useState();
    const [error, setError] = useState();
    const handleCancel = () => {
        navigate('../fitness_database/add_diet_log');
    }
    const handleSubmit = () => {
        if (description && calories && carbs && protein && fat) {
            const url = "http://localhost:3001/addMeal";
            Axios.post(url, {
                description: description,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            }).then(() => {
                navigate('../fitness_database/add_diet_log');
            })
        } else {
            setError('Fill out all fields to add a meal!');
        }
    }
    return (<div>
        <h1>Add a Meal</h1>
        <div>
            <label>Description: </label>
            <input type='text'  onChange={e => setDescription(e.target.value)}/>
        </div>
        <div>
            <label>Total Calories: </label>
            <input type='number' onChange={e => setCalories(e.target.value)}/>
        </div>
         <div>
            <label>Carbs (g): </label>
            <input type='number' onChange={e => setCarbs(e.target.value)}/>
        </div>
         <div>
            <label>Protein (g): </label>
            <input type='number' onChange={e => setProtein(e.target.value)}/>
        </div>
         <div>
            <label>Fat (g): </label>
            <input type='number' onChange={e => setFat(e.target.value)}/>
        </div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Submit and go back</button>
        {error && <p>{error}</p>}
    </div>)
}
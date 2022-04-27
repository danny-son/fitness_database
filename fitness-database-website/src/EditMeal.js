import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Meal from './MealObject';

export default function EditMeal() {
    const [newDescription, setNewDescription] = useState(Meal.description);
    const [newCalories, setNewCalories] = useState(Meal.calories);
    const [newCarbs, setNewCarbs] = useState(Meal.carbs);
    const [newProtein, setNewProtein] = useState(Meal.protein);
    const [newFat, setNewFat] = useState(Meal.fat);
    const [error, setError] = useState();

    const navigate = useNavigate();
    const handleCancel = () => {
        Meal.clear();
        navigate("../fitness_database/add_diet_log")
    }
    
    const handleSubmit = () => {
        if (newDescription && newCalories && newCarbs && newProtein && newFat) {
            const url = "http://localhost:3001/editMeal";
            Axios.put(url, {
                id: Meal.meal_id,
                description: newDescription,
                calories: newCalories,
                carbs: newCarbs,
                protein: newProtein,
                fat: newFat
            }).then(() => {
                Meal.clear();
                navigate("../fitness_database/add_diet_log")
            }).catch(() => {
                setError('Could not edit changes to this meal!');
            });
        } else {
            setError('Fill out all fields when editing a meal');
        }
    }

    return (<div className='edit-meal'>
        <h1>
            Edit a meal
        </h1>
        <div>
        <p>Meal Id: {Meal.meal_id}</p>
        <div>
            <label>Description: </label>
            <input type='text' placeholder={Meal.description} onChange={e => setNewDescription(e.target.value)}/>
        </div>
        <div>
            <label>Total Calories: </label>
            <input type='number' placeholder={Meal.calories} onChange={e => setNewCalories(e.target.value)}/>
        </div>
         <div>
            <label>Carbs (g): </label>
            <input type='number' placeholder={Meal.carbs} onChange={e => setNewCarbs(e.target.value)}/>
        </div>
         <div>
            <label>Protein (g): </label>
            <input type='number' placeholder={Meal.protein} onChange={e => setNewProtein(e.target.value)}/>
        </div>
         <div>
            <label>Fat (g): </label>
            <input type='number' placeholder={Meal.fat} onChange={e => setNewFat(e.target.value)}/>
        </div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Save and go back</button>
        </div>
        {error && <p>{error}</p>}
    </div>)
}
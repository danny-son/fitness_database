import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Meal from './MealObject';
import User from './User';

export default function AddDietLog() {
    const navigate = useNavigate();
    const [mealId, setMealId] = useState();
    const [description, setDescription] = useState();
    const [error, setError] = useState('');
    const [meals, setMeals] = useState([]);
    const [mealFilter, setMealFilter] = useState('all');
    const [filterSymbol, setFilterSymbol] = useState('=');
    const [macroValue, setMacroValue] = useState(0);
    const [count, setCount] = useState(0);
    const handleCancel = () => {
        navigate("../fitness_database/diet_logs")
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (description && mealId) {
            const url = 'http://localhost:3001/addDietLog';
            Axios.post(url, {
                username: User.username,
                id: mealId,
                description: description
            }).then(() => {
                navigate('../fitness_database/diet_logs');
            }).catch(() => {
                setError('Invalid meal id!');
            })
        } else {
            setError('Fill out all fields to log a diet!');
        }
    }

    const handleDelete = (key) => {
        const url = "http://localhost:3001/deleteMeal";
        const id = meals[key].meal_id;
        Axios.delete(url, {
            params: { id: id }
        }).then(() => {
            loadMeals();
        }).catch(() => {
            console.log('error deleting workout log');
        });    

    }

    const handleEdit = (key) => {
        Meal.setUp(meals[key].meal_id, meals[key].description, meals[key].total_calories,
            meals[key].carbs_g, meals[key].protein_g, meals[key].fat_g);
        navigate('../fitness_database/edit_meal');
    }

    const handleAdd = () => {
        navigate("../fitness_database/add_meal");
    }

    function getEndpoint() {
        switch(mealFilter) {
            case 'all':
                return '/viewAllMeals';
            case 'protein':
                return '/viewAllMealsByProtein';
            case 'calories':
                return '/viewAllMealsByCalories';
            case 'fat':
                return '/viewAllMealsByFat';
            case 'carbs':
                return '/viewAllMealsByCarbs';
            default: return '';
        }
    }

    async function loadMeals() {
        const endpoint = getEndpoint();
        let url = 'http://localhost:3001' + endpoint;
        console.log(endpoint)
        await Axios.get(url, {
            params: {
                symbol: filterSymbol,
                macroValue: macroValue
            }
        }).then((response) => {
            if (response.data) {
                setMeals(response.data);
            } else {
                setMeals([]);
            }
        }).catch(() => {
            console.log('failed to load meals!');
        });
    }


    useEffect(() => {
        if (count == 0) {
            loadMeals();
            setCount(count+1);
        }
    });
    return (<div>
        <h1>Log a Diet!</h1>
         <div className='add-log'>
            <label className='w_log'>Enter meal id:</label>
            <input  type='number' onChange={e => setMealId(e.target.value)}/>
            <label className='w_log'>Description:</label>
            <input className='d_input' type='text' onChange={e => setDescription(e.target.value)}/>
        </div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Add and go back!</button>
        {error  && <p className='error'>{error}</p>}
         <div>
            <h3>Select a filter to view the available workouts!</h3>
            <button onClick={handleAdd}>Add a Meal</button>
            <div className='subheader'>
                <select onChange={e => setMealFilter(e.target.value)}>
                <option value="all">View All</option>
                <option value="calories">Calories</option>
                <option value="protein">Protein</option>
                <option value="fat">Fat</option>
                <option value="carbs">Carbs</option>
            </select>
            </div>
            {mealFilter != 'all' &&
            <div>
                <label className='filter-label'>Choose a constraint</label>
                <select onChange={e => setFilterSymbol(e.target.value)}>
                <option value="=">Equal to</option>
                <option value=">">Greater than</option>
                <option value="<">Less than</option>
                </select>
                <label className='filter-label'>Enter a value</label>
                <input type='number' onChange={e => setMacroValue(e.target.value)}/>
            </div> }
            <button onClick={() => loadMeals()}>Click to View</button>
        </div>
        <div className='meals'>
                {meals.map((val,key) => {
                return <div className='meal'>
                    <p>Meal Id: {val.meal_id}</p>
                    <p>Description: {val.description}</p>
                    <p>Total Calories: {val.total_calories}</p>
                    <p>Carbs (g): {val.carbs_g}</p>
                    <p>Protein (g): {val.protein_g}</p>
                    <p>Fat (g): {val.fat_g}</p>
                    <button onClick={() => handleEdit(key)}>Edit Meal</button>
                    <button onClick={() => handleDelete(key)}>Delete Meal</button>
                </div>;
            })}
        </div>
    </div>)
}
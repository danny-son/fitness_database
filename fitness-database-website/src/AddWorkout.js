import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';


export default function AddWorkout() {
    const navigate = useNavigate();
    const [workouts, setWorkouts] = useState([]);
    const [workoutFilter, setWorkoutFilter] = useState('all');
    const [error, setError] = useState();
    const [word, setWord] = useState();
    const [value, setValue] = useState(0);
    const [count, setCount] = useState(0);
    const [workoutId, setWorkoutId] = useState();
    const [description, setDescription] = useState();
    const [workoutLength, setWorkoutLength] = useState();
    const handleNavBack = e => {
        e.preventDefault();
        navigate('../fitness_database/workout_logs');
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (workoutId && description && workoutLength) {
            const url = 'http://localhost:3001/logWorkout';
            Axios.post(url, {
                id: workoutId,
                desc: description,
                length: workoutLength,
                username: User.username
            }).then(() => {
                navigate('../fitness_database/workout_logs');
            }).catch(() => {
                setError('Could not create a workout log make sure u enter a valid id for workout');
            })
        } else {
            setError('Fill out all fields to enter a log');
        }
    }

    const handleReadWorkouts = e => {
        e.preventDefault();
        setWorkoutFilter(e.target.value);
    }

    const handleDifficulty = () => {
        if (value < 1 || value > 10 || !value) {
            setError('Need to input a value from 1-10');
        } else {
            setError('');
            loadWorkouts();
        }
    }

    function getEndpoint() {
        switch(workoutFilter) {
            case 'all':
                return "/viewWorkoutAll";
            case 'name':
                return "/viewWorkoutName";
            case 'difficulty':
                return "/viewWorkoutDifficulty";
            case 'muscle':
                return "/viewWorkoutMuscle";
            case 'equipment':
                return "/viewWorkoutEquipment";
            case 'exercise':
                return "/viewWorkoutExercise";
            default:
                return '';
        }
    }

    async function loadWorkouts() {
        console.log('this was loaded!');
        const endpoint = getEndpoint();
        let url = 'http://localhost:3001' + endpoint;
        if (workoutFilter == 'difficulty') {
            await Axios.get(url, {
                params: {
                    difficulty: value
                }
            }).then((response) => {
                if (response.data) {
                    setWorkouts(response.data);
                } else {
                    setWorkouts([]);
                }
            }).catch(() => {
                console.log('failed to load workouts');
            });
        } else {
            await Axios.get(url, {
                params: {
                    value: word
                }
            }).then((response) => {
                if (response.data) {
                    setWorkouts(response.data);
                } else {
                    setWorkouts([]);
                }
            }).catch(() => {
                console.log('failed to load workouts!');
            });
        }
    }

    useEffect(() => {
        if (count == 0) {
            loadWorkouts();
            setCount(count+1);
        }
    });
    return (
        <div>
            <h1>Log a workout</h1>
            <div className='add-log'>
                <label className='w_log'>Enter workout id:</label>
                <input  type='number' onChange={e => setWorkoutId(e.target.value)}/>
                <label className='w_log'>Description:</label>
                <input className='w_input' type='text' onChange={e => setDescription(e.target.value)}/>
                <label className='w_log'>Workout Length (mins):</label>
                <input type='number' onChange={e => setWorkoutLength(e.target.value)}/>
            </div>
            <button onClick={handleNavBack}>Cancel</button>
            <button onClick={handleSubmit}>Submit and go back!</button>
            {error != 'Need to input a value from 1-10' && <p className='error'>{error}</p>}
            <div>
                <h3>Select a filter to view the available workouts!</h3>
                <select onChange={handleReadWorkouts}>
                    <option value="all">View All</option>
                    <option value="name">Name</option>
                    <option value="muscle">Muscle Group</option>
                    <option value="exercise">Exercise</option>
                    <option value="equipment">Equipment</option>
                    <option value="difficulty">Difficulty</option>
                </select>
                {workoutFilter != 'all' && workoutFilter != 'difficulty' &&
                <div>
                    <label className='filter-label'>Type in a value:</label>
                    <input
                        id='search-workout'
                        type='text'
                        name='search-workout'
                        onChange={e => setWord(e.target.value)}>
                    </input>
                    <button onClick={() => loadWorkouts()}>Submit</button>
                </div>}
                {workoutFilter == 'difficulty' &&
                    <div>
                    <label className='filter-label'>Type in a value (1-10 only):</label>
                    <input
                        id='search-workout'
                        type='number'
                        name='search-workout'
                        onChange={e => setValue(e.target.value)}>
                    </input>
                    <button onClick={handleDifficulty}>Submit</button>
                    {error == 'Need to input a value from 1-10' && <p className='error'>{error}</p>}
                    </div>
                }
                {workoutFilter == 'all' && <button onClick={() => loadWorkouts()}>Click to View all!</button>}
            </div>
            <div className='workouts'>
                {workouts.map((val,key) => {
                return <div className='workout'>
                    <p>Workout Id: {val.w_id}</p>
                    <p>Name: {val.name}</p>
                    <p>Description: {val.description}</p>
                    <p>Equipment: {val.equipment}</p>
                    <p>Muscle Group: {val.muscle_group}</p>
                    <p>Difficulty: {val.difficulty}</p>
                    <p>Exercise type: {val.exercise_type}</p>
                </div>;
            })}
            </div>
        </div>
    );

}
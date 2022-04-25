import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './objects';


export default function Achievements() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [userAchievements, setUserAchievements] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const handleLogout = e => {      
        e.preventDefault();
        User.logout()
        navigate('../fitness_database/login');
    };

    const handleNavigation = e => {
        e.preventDefault();
        navigate('../fitness_database/home');
    }

    async function viewAchievements() {
        //calling to read all available achievements
        var url = "http://localhost:3001/viewAchievements";
        await Axios.get(url).then((response) => {
            setAchievements(response.data);
        }).catch(() => {
            console.log('error viewing achievements');
        });

        //calling to read all user achievements that they unlocked
        url = "http://localhost:3001/userAchievements";
        await Axios.get(url, {
            params: {
                username: User.username,
            }
        }).then((response) => {
            setUserAchievements(response.data);
        }).catch(() => {
            console.log('error viewing user achievements');
        });
    }

    useEffect(() => {
        if (count == 0) {
            viewAchievements();
            setCount(count+1);
        }
    });

    function handleClick(key) {
        console.log('Clicked on index:' + key)
    }
    //view achievement
    return (
        <div>
            <h1>{User.username}'s Achievements:</h1>
            <button onClick={handleNavigation}>Back to homepage</button>
            <button onClick={handleLogout}>Logout</button>
            <h3>All achievements:</h3>
            <div className='all-achievements'>
                {achievements.map((val, key) => {
                return <div className='achievement'>
                    <p>Achievement #{val.a_id}</p>
                    <p>Name: {val.name}</p>
                    <p>Description: {val.description}</p>
                    <p>Points: {val.points}</p>
                    <button onClick={() => handleClick(key)}>CLick to get index</button>
                </div>;
            })}
            </div>
            <h3>Achievments unlocked by user:</h3>
            <div className='all-achievements'>
                {userAchievements.map((val, key) => {
                return <div className='user-achievement'>
                    <p>Achievement #{val.a_id}</p>
                    <p>Name: {val.name}</p>
                    <p>Description: {val.description}</p>
                    <p>Points: {val.points}</p>
                    <button onClick={console.log(key)}>CLick to get index</button>
                </div>;
            })}
            </div>
        </div>
    );
}
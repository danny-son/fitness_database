import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';

export default function EditAccount() {
    const [password, setPassword] = useState(User.password);
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [message, setMessage] = useState('');

    const navigate = useNavigate();


    const handleCancel = () => {
        navigate('../fitness_database/home');
    }

    const updateUser = () => {
        const url = "http://localhost:3001/updateUserAccount";
            Axios.put(url, {
                username: User.username,
                password: password
            }).then(() => {
                User.updatePassword(password);
                setMessage('Password Successfully Changed!');
            }).catch(() => {
            setMessage('There was an error changing your password');
        });
    }

    const handleSubmit = e => {
       e.preventDefault();
        if (!password || !passwordConfirm) {
            setMessage('Please fill out all fields!');
        } else if (password.length < 8) {
            setMessage('Password must have at least 8 characters!');
        } else if (password != passwordConfirm) {
            setMessage('Make sure that both passwords inputted are the same!');
        } else {
            updateUser();
        }
    }

    

    const handleDelete = () => {
        const url = "http://localhost:3001/deleteUserAccount";
        Axios.delete(url, {
            params: {
                username: User.username
            }
        }).then(() => {
            console.log('account successfully deleted!');
            User.logout();
            navigate('../fitness_database/login');
        }).catch(() => {
            setMessage('There was an error deleting your account!');
        });
    }



    return (
        <div>
            <h3>Edit your account</h3>
            <h4>Username: {User.username}</h4>
            <label>Change password: </label>
            <input type='password' onChange={e => setPassword(e.target.value)}></input>
            <label>Confirm password: </label>
            <input type='password' onChange={e => setPasswordConfirm(e.target.value)}></input>
            <button onClick={handleCancel}>Back to Home</button>
            <button onClick={handleSubmit}>Apply Changes</button>
            <button onClick={() => handleDelete()}>Delete Account</button>
            {message && <p>{message}</p>}
        </div>
    )
}
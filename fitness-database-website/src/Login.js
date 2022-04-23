import Axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import User from './objects';

export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [databaseMSG, setDatabaseMSG] = useState();
  const url = "http://localhost:3001/login-user";
  const handleNavigate = e => {
    e.preventDefault();
    navigate("../fitness_database/register");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await Axios.get(url, {
      params: {
        username: username,
        password: password
      }
    }).then((response) => {
      if (response.status == 200) {
        User.login(username);
        navigate("/fitness_database/home")
      }
    }).catch(() => {
      setDatabaseMSG("Wrong credentials to login user, please enter correct username and password.");
    });
  };

  return (
    <div className='login-form-content'>
          <form className='login-form' onSubmit={handleSubmit}>
              <h1>Login to keep track of your fitness!</h1>
           <div className='form-inputs'>
              <label htmlFor='login-username' className='form-label'>Username</label>
               <input 
                id='login-username'
                type={'text'}
                name='login-username'
                className='form-input'
                placeholder='Enter your username'
                onChange={e => setUsername(e.target.value)}
                ></input>
          </div>
           <div className='form-inputs'>
              <label htmlFor='login-password' className='form-label'>Password</label>
               <input 
                id='login-password'
                type={'password'}
                name='login-password'
                className='form-input'
                placeholder='Enter your password'
                onChange={e => setPassword(e.target.value)}/>
          </div>
          <button className='form-login-btn' type='submit'>Log in</button>
          </form>
          <button className='form-register' onClick={handleNavigate}>Need an Account? Register here!</button>
          {databaseMSG && <p>{databaseMSG}</p>}
      </div>
  );
}

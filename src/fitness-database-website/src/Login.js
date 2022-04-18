import React from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate();

  const handleNavigate = e => {
    e.preventDefault();
    console.log("Navigate from login to register!");
    navigate("../fitness_database/register");
  };

  return (
    <div className='login-form-content'>
          <form className='login-form'>
              <h1>Login to keep track of your fitness!</h1>
           <div className='form-inputs'>
              <label htmlFor='login-username' className='form-label'>Username</label>
               <input 
                id='login-username'
                type={'text'}
                name='login-username'
                className='form-input'
                placeholder='Enter your username'></input>
          </div>
           <div className='form-inputs'>
              <label htmlFor='login-password' className='form-label'>Password</label>
               <input 
                id='login-password'
                type={'password'}
                name='login-password'
                className='form-input'
                placeholder='Enter your password'></input>
          </div>
          <button className='form-login-btn' type='submit'>Log in</button>
          </form>
          <button className='form-register' onClick={handleNavigate}>Need an Account? Register here!</button>
      </div>
  )
}

export default Login;
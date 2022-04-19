import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
        username:'',
        password:'',
      });

  const handleNavigate = e => {
    e.preventDefault();
    console.log("username is " + values.username);
    console.log("password is " + values.password);
    navigate("../fitness_database/register");
  };

  const handleChange = e => {
    const {name, value} = e.target
        setValues({
            ...values,
            [name]: value 
        });
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
                onChange={handleChange}
                placeholder='Enter your username'></input>
          </div>
           <div className='form-inputs'>
              <label htmlFor='login-password' className='form-label'>Password</label>
               <input 
                id='login-password'
                type={'password'}
                name='login-password'
                onChange={handleChange}
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
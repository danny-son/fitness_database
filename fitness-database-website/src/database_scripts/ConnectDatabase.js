import React, {useState} from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../register.css';


export default function ConnectDatabase() {
      const navigate = useNavigate();
      const [errorMessage, setErrorMessage] = useState();
      const [values, setValues] = useState({
        username:'',
        password:''
      });


      const handleSubmit = e => {
          e.preventDefault();
          Axios.post("http://localhost:3001/connect-database", {
            username: values.username,
            password: values.password
          }).then((response) => {
              if (response.status == 200) {
                navigate('/fitness_database/login');
              }
          }).catch(() => {
                setErrorMessage('Could not connect to database, incorrect password or username!');
          });
      };

      const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value 
        });

      };
      return (
      <div>
         <form className='form'>
              <h1>Enter your credentials to connect to the fitness database</h1>
           <div className='form-inputs'>
              <label htmlFor='username' className='form-label'>Username</label>
               <input 
                id='username'
                type={'text'}
                name='username'
                onChange={handleChange}
                className='form-input'
                placeholder='Enter your username'/>
               
          </div>
           <div className='form-inputs'>
              <label htmlFor='password' className='form-label'>Password</label>
               <input 
                id='password'
                type={'password'}
                onChange={handleChange}
                name='password'
                className='form-input'
                placeholder='Enter your password'/>
          </div>
          <div>
            <button className='form-register-btn' type='submit' onClick={handleSubmit}>Sign up</button>
          </div>
          </form>
          {errorMessage && <p className="form-inputs">{errorMessage}</p>}
      </div>
      );
}
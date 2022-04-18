import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


export default function ConnectDatabase() {
      const navigate = useNavigate();
      const [values, setValues] = useState({
        username:'',
        password:'',
      });


      const handleSubmit = e => {
            e.preventDefault();
            console.log("Database Connection submitted");
            console.log("username is: " + values.username);
            console.log("password is: " + values.password);
            navigate("../fitness_database/register");
      }

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
      </div>
      );
}
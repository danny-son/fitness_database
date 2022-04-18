import {useState, useEffect} from 'react';
import Axios from 'axios'

const useForm = validateInfo => {
    const [values, setValues] = useState({
        username:'',
        password:'',
        password2:''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const register = () => {
        Axios.post('https://localhost3001/fitness_database/register', {username: values.username, password: values.password});
    }

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value 
        });

    };
    
    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validateInfo(values));

        if (!errors.password && !errors.username && !errors.password2) {
    
        } else {
            console.log('not perfecf!');
        }
    };
    return {handleChange, values, handleSubmit, errors};
};


export default useForm;
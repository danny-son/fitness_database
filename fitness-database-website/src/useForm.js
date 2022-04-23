import {useState} from 'react';
import Axios from 'axios'

const useForm = validateInfo => {
    const [values, setValues] = useState({
        username:'',
        password:'',
        password2:''
    });
    const url = "http://localhost:3001"
    const [errors, setErrors] = useState({});
    const [databaseMSG, setDatabaseMSG] = useState();
    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value 
        });
    };
    
    const handleSubmit = async e => {
        e.preventDefault();

        setErrors(validateInfo(values));

        if (!errors.password && !errors.username && !errors.password2) {
            let fullUrl = url + `/check-user-exists`;
            await Axios.get(fullUrl,{
                params: {
                    username: values.username
                }
            }).then((response) => {
                if (response.status == 200) {
                  let fullUrl = url + "/register-user";
                  Axios.post(fullUrl,{
                      username: values.username,
                      password: values.password
                  }).then((response) => {
                      if (response.status == 200) {
                           setDatabaseMSG("Account created, click on the log in button to login your newly created account!")
                      }
                  }).catch(() => {
                      setDatabaseMSG("Seems to be an error creating your account");
                  })
                }
            }).catch(() => {
                setDatabaseMSG("This user already exists!");
            });
        }
    };
    return {handleChange, values, handleSubmit, errors, databaseMSG};
};


export default useForm;
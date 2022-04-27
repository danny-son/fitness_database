import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './Home';
import ConnectDatabase from './database_scripts/ConnectDatabase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Achievements from './Achievements';
import DietLogs from './DietLogs';
import WorkoutLogs from './WorkoutLogs';
import AddWorkout from './AddWorkout';
import EditWorkoutLog from './EditWorkoutLog';
import EditAccount from './EditAccount';
import AddMeal from './AddMeal';
import EditMeal from './EditMeal';
import EditDietLog from './EditDietLog';
import AddDietLog from './AddDietLog';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/fitness_database' element={<ConnectDatabase />}/>
          <Route path='/fitness_database/login' element={<Login/>}/>
          <Route path='/fitness_database/register' element={<Register/>}/>
          <Route path='/fitness_database/home' element={<Home/>}/>
          <Route path='/fitness_database/achievements' element={<Achievements/>}/>
          <Route path='/fitness_database/workout_logs' element={<WorkoutLogs/>}/>
          <Route path='/fitness_database/diet_logs' element={<DietLogs/>}/>
          <Route path='/fitness_database/add_workout' element={<AddWorkout/>}/>
          <Route path='/fitness_database/edit_workout_log' element={<EditWorkoutLog/>}/>
          <Route path='/fitness_database/edit_account' element={<EditAccount/>}/>
          <Route path='/fitness_database/add_meal' element={<AddMeal/>}/>
          <Route path='/fitness_database/edit_meal' element={<EditMeal/>}/>
          <Route path='/fitness_database/edit_diet_log' element={<EditDietLog/>}/>
          <Route path='/fitness_database/add_diet_log' element={<AddDietLog/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

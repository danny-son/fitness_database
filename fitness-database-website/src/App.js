import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './Home';
import ConnectDatabase from './database_scripts/ConnectDatabase';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/fitness_database' element={<ConnectDatabase />}/>
          <Route path='/fitness_database/login' element={<Login/>}/>
          <Route path='/fitness_database/register' element={<Register/>}/>
          <Route path='/fitness_database/home' element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import { Routes , Route , NavLink } from 'react-router-dom';
import Home from './Components/Home';
import SingUp from './Components/SingUp';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <ul className='navbar'>
        <li>
          <NavLink className={"link"} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink 
            className={"link"} to="/singup">SingUp</NavLink>
        </li>
        <li>
          <NavLink className={"link"} to="/login">Login</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

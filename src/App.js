import { useState, useEffect } from 'react';
import './App.css';
import Home from './Components/Home';
import SingUp from './Components/SingUp';
import Login from './Components/Login';
import { auth } from './Components/Firebase';

function App() {
  
  const [show , setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  function showLogSing() {
    if(show){
      return <div className='logsing'>
        <SingUp />
        <button className='but' onClick={() => setShow(false)}>If you have an account <strong>Login</strong></button>        
      </div> 
    } 
    else {
      return <div className='logsing'>
        <Login />
        <button className='but' onClick={() => setShow(true)}>SingUp</button>        
      </div>
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    }
    );
  }
  , []);

  return (
    <div className="App">
      {currentUser ? (
        <div>
            Welcome, {currentUser.email}
            <Home />
        </div>
      ) : (
        <div className='logsing'>
          <p>You are not logged in.</p>
          {showLogSing()}          
        </div>
      )}

    </div>
  );
}

export default App;

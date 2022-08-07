import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import SingUp from "./Components/SingUp";
import Login from "./Components/Login";
import { auth } from "./Components/Firebase";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

function App() {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  function showLogSing() {
    if (show) {
      return (
        <div className="logsing">
          <SingUp />
          <Button
            onClick={() => setShow(false)}
            variant="contained"
            endIcon={<LoginIcon />}
            style={{
              backgroundColor: "#00bcd4",
              color: "#fff",
              marginTop: "20px",
            }}
          >
            If you have an account<strong>, Login</strong>
          </Button>
        </div>
      );
    } else {
      return (
        <div className="logsing">
          <Login />
          <Button
            onClick={() => setShow(true)}
            variant="contained"
            endIcon={<PersonAddAltIcon />}
            style={{
              backgroundColor: "#00bcd4",
              color: "#fff",
              marginTop: "20px",
            }}
          >
            SingUp
          </Button>
        </div>
      );
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <div className="App">
      {currentUser ? (
        <div>
          <Home />
        </div>
      ) : (
        <div className="logsing">
          <p>You are not logged in.</p>
          {showLogSing()}
        </div>
      )}
    </div>
  );
}

export default App;

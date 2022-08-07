import React from "react";
import { auth } from "./Firebase";
import { Button, TextField } from '@mui/material'; 
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="access">
      <h2>Login</h2>
      <form>
        <h1>Xpenc</h1>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          style={{
            backgroundColor:"#f8f9fa",
            width: "100%",
            margin: "5px",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          style={{
            backgroundColor:"#f8f9fa",
            width: "100%",
            margin: "5px",
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
        onClick={handleSubmit}
        variant="contained"
        endIcon={<LoginIcon />}
        style={{
          backgroundColor: '#00bcd4',
          color: '#fff',
          marginTop: '20px',
        }}
        >Login</Button>
      </form>
    </div>
  );
}

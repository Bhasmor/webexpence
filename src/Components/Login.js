import { useState, Fragment } from "react";
import { auth } from "./Firebase";
import { Button, TextField, IconButton, Snackbar, Alert } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        setSuccessMessage("User logged in successfully");
        setOpen(true);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      {
        handleSubmit(e);
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setError(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        style={{ color: "red" }}
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div className="access">
      <h2>Login</h2>
      <form>
        <h1>Xpenc</h1>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          onKeyDown={handleKeyDown}
          type="email"
          style={{
            backgroundColor: "#f8f9fa",
            width: "100%",
            margin: "5px",
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onKeyDown={handleKeyDown}
          type="password"
          style={{
            backgroundColor: "#f8f9fa",
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
            backgroundColor: "#00bcd4",
            color: "#fff",
            marginTop: "20px",
          }}
        >
          Login
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        severity="success"
        message="Successfully Added"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        message="An error occured"
        action={action}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

import { useState, Fragment } from "react";
import { auth, db } from "./Firebase";
import {
  Button,
  TextField,
  ButtonGroup,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Add() {
  const date = new Date();

  const [incoexpence, setIncoexpence] = useState({
    incoexp: "Income",
    amount: "",
    date: date.toLocaleDateString(),
    category: "",
    description: "",
    userUid: auth.currentUser.uid,
  });

  const [inOut, setInOut] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const dateReverse = date.toLocaleDateString().split(".").reverse().join("-");

  const sendData = (e) => {
    try {
      e.preventDefault();
      setIncoexpence({
        ...incoexpence,
      });
      db.collection("incoexpence").add(incoexpence);
      setIncoexpence({
        ...incoexpence,
        amount: "",
        category: "",
        description: "",
      });
      setOpen(true);
    } catch (err) {
      setError(true);
    }
  };

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

  console.log(incoexpence.amount);

  const incomeGroup = (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Salary" })}
        style={{ margin: "5px" }}
      >
        Salary
      </Button>
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Bonus" })}
        style={{ margin: "5px" }}
      >
        Bonus
      </Button>
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Other" })}
        style={{ margin: "5px" }}
      >
        Other
      </Button>
    </ButtonGroup>
  );

  const expenceGroup = (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Food" })}
        style={{ margin: "5px" }}
      >
        Food
      </Button>
      <Button
        onClick={() =>
          setIncoexpence({ ...incoexpence, category: "Transport" })
        }
        style={{ margin: "5px" }}
      >
        Transport
      </Button>
      <Button
        onClick={() =>
          setIncoexpence({ ...incoexpence, category: "Entertainment" })
        }
        style={{ margin: "5px" }}
      >
        Entertainment
      </Button>
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Utility" })}
        style={{ margin: "5px" }}
      >
        Utility
      </Button>
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Pet" })}
        style={{ margin: "5px" }}
      >
        Pet
      </Button>
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Debt" })}
        style={{ margin: "5px" }}
      >
        Debt
      </Button>
      <Button
        onClick={() => setIncoexpence({ ...incoexpence, category: "Other" })}
        style={{ margin: "5px" }}
      >
        Other
      </Button>
    </ButtonGroup>
  );

  const req = incoexpence.amount === "" || isNaN(incoexpence.amount);
  const val = isNaN(incoexpence.amount) ? "" : incoexpence.amount;

  return (
    <div className="add-container">
      <div className="add-content">
        <h1>Add Income/Expence</h1>
        <div className="add-form">
          <div className="add-form-item">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => {
                  setIncoexpence({ ...incoexpence, incoexp: "Income" });
                  setInOut(true);
                }}
              >
                Income
              </Button>
              <Button
                onClick={() => {
                  setIncoexpence({ ...incoexpence, incoexp: "Expence" });
                  setInOut(false);
                }}
              >
                Expence
              </Button>
            </ButtonGroup>
          </div>
          <div className="add-form-item">
            <TextField
              type="text"
              id="amount"
              variant="outlined"
              label="Amount"
              value={val}
              onChange={(e) =>
                setIncoexpence({
                  ...incoexpence,
                  amount: parseInt(e.target.value),
                })
              }
              style={{
                backgroundColor: "#f8f9fa",
                margin: "5px",
                width: "100%",
              }}
            />
          </div>
          <div className="add-form-item">
            <TextField
              type="date"
              id="date"
              variant="outlined"
              value={dateReverse}
              onChange={(e) =>
                setIncoexpence({ ...incoexpence, date: e.target.value })
              }
              style={{
                backgroundColor: "#f8f9fa",
                margin: "5px",
                width: "100%",
              }}
            />
          </div>
          <div className="add-form-item">
            {inOut ? incomeGroup : expenceGroup}
          </div>
          <div className="add-form-item">
            <TextField
              type="text"
              id="description"
              variant="outlined"
              label="Description"
              onChange={(e) =>
                setIncoexpence({ ...incoexpence, description: e.target.value })
              }
              style={{
                backgroundColor: "#f8f9fa",
                margin: "5px",
                width: "100%",
              }}
            />
          </div>
          <div className="add-form-item">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#00bcd4",
                margin: "5px",
                width: "70%",
              }}
              onClick={sendData}
              disabled={req}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        severity="success"
        message="Successfully Added"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully Added!
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
          An error occured!
        </Alert>
      </Snackbar>
    </div>
  );
}

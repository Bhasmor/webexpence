import React from "react";
import { auth } from "./Firebase";
import { Routes, Route, NavLink } from "react-router-dom";
import Add from "./Add";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Show from "./Show";
import History from "./History";

export default function Home() {
  return (
    <div className="home-container">
      <div className="navbar">
        <ul>
          <h1>Xpenc</h1>
          <li>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="add">
              Add Income/Expence
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="history">
              History
            </NavLink>
          </li>
          <Button
            onClick={() => auth.signOut()}
            variant="contained"
            endIcon={<LogoutIcon />}
            style={{
              backgroundColor: "red",
              color: "#fff",
              marginTop: "20px",
            }}
          >
            SingOut
          </Button>
          <p>Copyright &copy; 2022 Xpenc</p>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Show />} />
        <Route path="add" element={<Add />} />
        <Route path="history" element={<History />} />
      </Routes>
    </div>
  );
}

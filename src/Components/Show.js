import React from "react";
import CureencyRenderer from "./CureencyRenderer";
import Data from "./data/Data";

export default function Show() {
  return (
    <div className="home-content">
      <div className="current-balance">
        <h2>Current Balance</h2>
        <CureencyRenderer />
      </div>
        <Data />
    </div>
  );
}

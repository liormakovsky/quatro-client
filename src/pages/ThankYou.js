import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="main-container">
      <div id="tnxContainer">
        <h3>תודה שנכנסת למערכת</h3>
        <Link to="/login">
          <button onClick={() => localStorage.clear()}>התנתק מהמערכת</button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

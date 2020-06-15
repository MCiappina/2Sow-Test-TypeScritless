import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  return (
    <div>
      <Link style={{ margin: "20px" }} to="/">
        HOME
      </Link>
      <Link style={{ margin: "20px" }} to="/userlist">
        USER LIST
      </Link>
      <Link style={{ margin: "20px" }} to="/editscreen">
        EDIT SCREEN
      </Link>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Navbar;

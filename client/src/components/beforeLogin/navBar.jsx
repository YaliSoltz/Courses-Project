import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../helpers/userContext";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome</div>

        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />

          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>

          <div className="menu">
            <li>
              <Link to="/">home</Link>
            </li>

            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
            <Link to="/signUp">sign up</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

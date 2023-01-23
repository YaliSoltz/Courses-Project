import React, { Fragment } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../helpers/userContext";

const NavBar = () => {
  const { user, subjects, setCourseSubject, setCourse } =
    useContext(UserContext);
  const date = new Date().getHours();
  let welcome;
  if (date >= 4 && date < 12) welcome = "Good Morning";
  else if (date >= 12 && date < 18) welcome = "Good Afternoon";
  else if (date >= 18 && date < 21) welcome = "Good Evening";
  else if (date >= 21 || date < 4) welcome = "Good Night";

  return (
    <Fragment>
      <nav className="navbar">
        <div className="logo">
          {welcome}, {user.name}
        </div>

        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />

          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>

          <div className="menu">
            <li onClick={() => setCourse()}>
              <Link to="/">home</Link>
            </li>

            <li>
              <Link to="/myCourses">my courses</Link>
            </li>

            <li className="courses" onClick={() => setCourse()}>
              <Link>Courses</Link>

              <ul className="dropdown">
                {subjects.map((subject, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setCourse();
                      setCourseSubject(subject);
                    }}
                  >
                    <Link to="/newCourse">{subject.subject}</Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                to="/login"
                id="logout"
                onClick={() => {
                  localStorage.removeItem("x-auth-token");
                }}
              >
                logout
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </Fragment>
  );
};

export default NavBar;

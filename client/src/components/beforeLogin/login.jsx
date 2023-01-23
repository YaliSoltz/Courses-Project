import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/cyberPro/login";
    let { data } = await axios.post(url, { email, password });
    localStorage.setItem("x-auth-token", data);
    navigate("/");
  }
  return (
    <Fragment>
      <div className="login_main">
        <p className="sign" align="center">
          Sign in
        </p>

        <form className="form1" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="un "
            type="email"
            align="center"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="submit" align="center">
            Sign in
          </button>

          <Link to="/resetPassword">
            {" "}
            <p className="forgot" align="center">
              Forgot Password?
            </p>
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;

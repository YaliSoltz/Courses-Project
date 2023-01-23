import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/cyberPro/users";
    await axios.post(url, { ...user });
    alert('signed up')
    navigate("/login");
  }
  return (
    <Fragment>
       <div className="login_main">
        <p className="sign" align="center">
          Sign up
        </p>

        <form className="form1" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="un "
            type="text"
            align="center"
            placeholder="name"
            onChange={(e) => setUser({...user, name: e.target.value})}
          />
          <input
            className="un "
            type="email"
            align="center"
            placeholder="Email"
            onChange={(e) => setUser({...user, email: e.target.value})}
          />

          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            onChange={(e) => setUser({...user, password: e.target.value})}
          />

          <button className="submit" align="center">
            Sign up
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;

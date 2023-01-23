import axios from "axios";
import React, { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPassword2, setNewPassword2] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:4000/api/cyberPro/users";
    await axios.put(url, { email, newPassword, newPassword2 });
    alert("password reseted");
    navigate("/login");
  }
  return (
    <Fragment>
      <div className="login_main">
        <p className="sign" align="center">
          Reset password
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
            placeholder="New password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Validate password"
            onChange={(e) => setNewPassword2(e.target.value)}
          />

          <button className="submit" align="center">
            Reset
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPass;

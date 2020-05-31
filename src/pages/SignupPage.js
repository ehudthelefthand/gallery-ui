import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "../Context";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();
  const user = useAuthState();

  if (user.isLogin) {
    history.replace("/admin");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="username">
            Username
          </label>
          <input
            className="login-form__text"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form__text"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">
            Confirm
          </label>
          <input
            className="login-form__text"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="login-form__field login-form__field--space-evenly">
          <button className="login-form__submit" type="submit">
            signup
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        <p>Already have account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

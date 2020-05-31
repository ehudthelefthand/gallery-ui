import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import API from "../api";
import { useAuthState, useAuthDispatch } from "../Context";
import Storage from "../storage";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  if (user.isLogin) {
    history.replace("/admin");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    API.login({ email, password })
      .then((res) => {
        dispatch({ type: "SET_USER", isLogin: true, email });
        Storage.saveToken(res.data.token);
        const { from } = location.state || { from: { pathname: "/admin" } };
        history.replace(from);
      })
      .catch(() => {
        setMessage("Login fail! Username or Password is invalid");
      });
  };

  return (
    <div>
      {message && <div className="message message--error">{message}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="login-form__text"
            type="email"
            value={email}
            placeholder="test@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setMessage("")}
          />
        </div>
        <div className="login-form__field">
          <label className="login-form__label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="login-form__text"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form__field login-form__field--space-evenly">
          <button className="login-form__submit" type="submit">
            login
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        <p>No account?</p>
        <Link to="/signup">Singup</Link>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useHistory, Route, Redirect } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../Context";
import API from "../api";
import Storage from "../storage";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setMessage("Email or Password can't be empty");
      return;
    }
    if (password.trim() !== passwordConfirm.trim()) {
      setMessage("Password and Confirm is not match");
      return;
    }
    API.signup({ email, password })
      .then((res) => {
        const { email, token } = res.data;
        dispatch({ type: "SET_USER", isLogin: true, email });
        Storage.saveToken(token);
        history.replace("/admin");
      })
      .catch(() => {
        setMessage("Login fail! Username or Password is invalid");
      });
  };

  return (
    <Route
      render={() =>
        user.isLogin ? (
          <Redirect to="/admin" />
        ) : (
          <div>
            {message && <div className="message message--error">{message}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form__field">
                <label className="login-form__label" htmlFor="email">
                  Email
                </label>
                <input
                  className="login-form__text"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setMessage("")}
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
        )
      }
    ></Route>
  );
}

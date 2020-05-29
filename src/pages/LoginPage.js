import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div>
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

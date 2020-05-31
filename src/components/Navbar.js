import React from "react";
import { Link } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../Context";
import API from "../api";
import Storage from "../storage";

export default function () {
  const user = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    API.logout()
      .then(() => {
        Storage.saveToken("");
        dispatch({ type: "SET_USER", isLogin: false });
      })
      .catch(() => {});
  };

  return (
    <nav className="nav">
      <Link to="/admin" className="nav__brand">
        Gallery
      </Link>
      <div className="nav__right">
        {user.isLogin && (
          <button className="nav__logout" onClick={() => logout()}>
            logout
          </button>
        )}
      </div>
    </nav>
  );
}

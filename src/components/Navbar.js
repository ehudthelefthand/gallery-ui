import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../Context";
import API from "../api";
import Storage from "../storage";

export default function () {
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const logout = () => {
    API.logout()
      .then(() => {
        Storage.saveToken("");
        dispatch({ type: "SET_USER", isLogin: false });
        history.replace("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <nav className="nav">
      {user.isLogin ? (
        <Link to="/private" className="nav__brand">
          Gallery
        </Link>
      ) : (
        <Link to="/" className="nav__brand">
          Gallery
        </Link>
      )}
      <div className="nav__right">
        {user.isLogin && (
          <button className="nav__logout" onClick={() => logout()}>
            logout
          </button>
        )}
        {!user.isLogin && (
          <>
            <Link className="nav__login" to="/login">
              Login
            </Link>
            <Link className="nav__signup" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

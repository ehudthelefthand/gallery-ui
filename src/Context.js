import React, { createContext, useContext } from "react";
import API from "./api";
import Storage from "./storage";

const AuthContext = createContext();

function AuthProvider(props) {
  let user = { isLogin: false };

  const login = ({ email, password }) => {
    API.login({ email, password })
      .then((res) => {
        user = { ...user, isLogin: true };
        Storage.saveToken(res.data.token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    API.logout()
      .then(() => {
        user = { ...user, isLogin: false };
        Storage.saveToken("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signup = ({ email, password }) => {
    API.signup({ email, password })
      .then((res) => {
        user = { ...user, isLogin: true };
        Storage.saveToken(res.data.token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup }}
      {...props}
    ></AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

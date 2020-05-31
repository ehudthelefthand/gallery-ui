import React, { createContext, useContext, useReducer } from "react";
import Storage from "./storage";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      const { isLogin, email } = action;
      return { ...state, isLogin, email };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }) {
  const isLogin = Storage.getToken() !== "";
  const [state, dispatch] = useReducer(authReducer, { isLogin });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuthState, useAuthDispatch };

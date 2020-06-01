import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { useAuthState } from "./Context";

function Private({ children, ...rest }) {
  let user = useAuthState();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isLogin ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    ></Route>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Private path="/admin">
            <AdminPage />
          </Private>
          <Route path="*">
            <Redirect to={{ pathname: "/" }} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

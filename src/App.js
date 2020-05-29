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

function AuthenticatedApp() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/admin">
          <AdminPage />
        </Route>
        <Route exact path="/">
          <div>home</div>
        </Route>
        <Route path="*">
          <Redirect to={{ pathname: "/admin" }} />
        </Route>
      </Switch>
    </Router>
  );
}

function UnauthenticatedApp() {
  return (
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
          <div>home</div>
        </Route>
        <Route path="*">
          <Redirect to={{ pathname: "/" }} />
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  let user = {};
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      {/* <Router>
        <Navbar />
        <Switch>
          <Route exact path="/admin">
            <AdminPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/">
            <div>home</div>
          </Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminPage from "./pages/AdminPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <div>home</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

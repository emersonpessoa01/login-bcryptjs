import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/login";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

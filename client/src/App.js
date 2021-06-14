import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/Dashboard";
import  history  from "./services/history";

function App() {
  return (
    <div>
      {/* Todas s rotas vão está dentro desse AuthProvider e todas a rotas estão recebendo o context*/}
      <AuthProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/Dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

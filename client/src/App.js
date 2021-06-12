import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { AuthProvider } from "./Context/AuthContext";
import { history } from "./services/history";

function App() {
  return (
    <div>
      {/* Todas s rotas vão está dentro desse AuthProvider e todas a rotas estão recebendo o context*/}
      <AuthProvider>
        <Router history={history}>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

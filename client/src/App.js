import React from "react";
import { Router, Switch } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import history from "./services/history";
import Routes from "./routes/routesAdm";

function App() {
  return (
    <div>
      {/* Todas s rotas vão está dentro desse AuthProvider e todas a rotas estão recebendo o context*/}
      <AuthProvider>
        <Router history={history}>
          <Switch>
            <Routes />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

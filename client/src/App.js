import React, { useContext } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/Dashboard";
import history from "./services/history";
import { Context } from "./Context/AuthContext";

function App() {
  const CustomRoute = ({ isPrivate, ...rest }) => {
    const { authenticated } = useContext(Context);
    if (isPrivate && !authenticated) {
      return <Redirect to="/" />;
    }
    return <Route {...rest} />;
  };

  return (
    <div>
      {/* Todas s rotas vão está dentro desse AuthProvider e todas a rotas estão recebendo o context*/}
      <AuthProvider>
        <Router history={history}>
          <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/Dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

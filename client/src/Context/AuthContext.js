//Compartilhar dados entre os componentes de forma global
//children recebe os dados que os componentes fornecem
import React, { createContext, useState, useEffect } from "react";
import api from "../config/index";
import history from "../services/history";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLogin = async () => {
      const token = localStorage.getItem("token");
      // console.log(`Token: ${JSON.parse(token)}`);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`; //cabeçalho da api
        setAuthenticated(true);
      }
      setLoading(false);
    };
    getLogin();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  function handleLogout() {
    // console.log("Sair")
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    return history.push("/");
  }

  return (
    <Context.Provider value={{ authenticated, handleLogout }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };

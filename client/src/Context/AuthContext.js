//Compartilhar dados entre os componentes de forma global
//children recebe os dados que os componentes fornecem
import React, { createContext } from "react";

const Context = createContext();

const AuthProvider = ({ children }) => {
  return (
    <Context.Provider value={{ authenticated: false }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };

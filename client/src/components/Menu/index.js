import React, { useContext } from "react";
import { NavList } from "./styles";
import { NavLink } from "react-router-dom";
import { Context } from "../../Context/AuthContext";

const Menu = () => {
  const { handleLogout } = useContext(Context);
  return (
    <nav>
      <NavList>
        <NavLink to="/dashboard exact">
          <li>Dashboard</li>
        </NavLink>
      </NavList>
      <NavList>
        <NavLink to="/listar exact">
          <li>Usuários</li>
        </NavLink>
        
        {/* Para destruir o token após sair */}
        <NavLink to="#">
          <li onClick={handleLogout}>Sair</li>
        </NavLink>
      </NavList>
    </nav>
  );
};

export default Menu;
//assim pode exportar qualquer outro local

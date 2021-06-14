import React from "react";
import { NavList } from "./styles";

const Menu = () => {
  return (
    <nav>
      <NavList>
        <li>Dashboard</li>
      </NavList>
      <NavList>
        <li>Usuários</li>
      </NavList>
    </nav>
  );
};

export default Menu;
//assim pode exportar qualquer outro local

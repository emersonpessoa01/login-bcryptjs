import React, { useContext } from "react";
import { Context } from "../../Context/AuthContext";
import { Container } from "../../styles/Custom_adm";
import Menu from "../../components/Menu";

export const Dashboard = () => {
  //Para destruir o token apos sair
  const { handleLogout } = useContext(Context);

  return (
    <Container>
      <Menu />
      <h1>Dashboard</h1>
      {/* Botão com a função de sair */}
      <button type="button" onClick={handleLogout}>
        Sair
      </button>
    </Container>
  );
};

import React from "react";
import { Container } from "../../styles/Custom_adm";
import Menu from "../../components/Menu";

export const Dashboard = () => {
  //Para destruir o token apos sair

  return (
    <Container>
      <Menu />
      <h1>Dashboard</h1>
      {/* Botão com a função de sair */}
    </Container>
  );
};

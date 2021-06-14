import React from "react";
import Menu from "../../components/Menu";
import { Container } from "../../styles/Custom_adm";

export const listar = () => {
  return (
    <Container>
      <Menu />
      <h1>Listar usuários</h1>
    </Container>
  );
};

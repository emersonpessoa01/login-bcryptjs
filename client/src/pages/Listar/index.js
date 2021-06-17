import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";

import api from "../../config/configApi";

import {
  Container,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  ButtonSuccess,
  Table,
  AlertDanger,
  AlertSuccess,
  ButtonPrimary,
  ButtonWarning,
  ButtonDanger,
} from "../../styles/custom_adm";

export const Listar = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const { data } = await api.get("/usuarios");
        console.log(data.usuarios);
        setData(data.usuarios);
      } catch (err) {
        setStatus({
          type: "error",
          mensagem: "Tente mais tarde!",
        });
      }
    };
    getUsuarios();
  }, []);

  const apagarUsuario = async (id) => {
    console.log("Apagar ID:" + id);

    const headers = {
      "Type-Content": "application/json",
    };

    await api
      .delete("/usuario/" + id, { headers })
      .then((response) => {
        if (response.data.error) {
          setStatus({
            type: "error",
            mensagem: response.data.message,
          });
        } else {
          setStatus({
            type: "success",
            mensagem: response.data.message,
          });
        }
      })
      .catch((err) => {
        setStatus({
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      });
  };

  return (
    <Container>
      <Menu />
      <ConteudoTitulo>
        <Titulo>Listar Usuários</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>
      {status.type === "error" ? (
        <AlertDanger>{status.mensagem}</AlertDanger>
      ) : (
        ""
      )}
      {status.type === "success" ? (
        <AlertSuccess>{status.mensagem}</AlertSuccess>
      ) : (
        ""
      )}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <Link to={"/visualizar/" + usuario.id}>
                    <ButtonPrimary>Visualizar</ButtonPrimary>
                  </Link>{" "}
                  <Link to={"/editar/" + usuario.id}>
                    <ButtonWarning>Editar</ButtonWarning>
                  </Link>{" "}
                  <Link to={"#"}>
                    <ButtonDanger onClick={() => apagarUsuario(usuario.id)}>
                      Apagar
                    </ButtonDanger>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

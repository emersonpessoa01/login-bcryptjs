import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { Link } from "react-router-dom";
import {
  Container,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  ButtonSuccess,
  Table,
  AlertDanger,
  Alertsuccess,
} from "../../styles/Custom_adm";
import api from "../../config/index";

export const listar = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const headers = {
    "Type-Content": "json/application",
  };

  useEffect(() => {
    const getUsuarios = async () => {
      await api
        .get("/usuarios" + data, { headers })
        .then((response) => {
          // console.log(response.data)

          if (response.data.error) {
            setStatus({
              type: "error",
              mensagem: response.data.message,
            });
          } else {
            setData(response.data.usuarios);
          }
        })
        .catch(() => {
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!",
          });
        });
    };
    getUsuarios();
  }, []);

  return (
    <Container>
      <Menu />
      <ConteudoTitulo>
        <Titulo>Listar usuários</Titulo>
        <BotaoAcao>
          <Link to="/cadastrar">
            <ButtonSuccess>Cadastrar</ButtonSuccess>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      <hr />
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
            <th>Email</th>
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
                <td>Visualizar Editar Apagar</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

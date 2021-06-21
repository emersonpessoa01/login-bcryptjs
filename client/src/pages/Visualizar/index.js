import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";

import {
  Container,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  AlertDanger,
  AlertSuccess,
  ButtonInfo,
  Conteudo,
  Table,
  ButtonPrimary,
} from "../../styles/custom_adm";
// import { ConteudoUsuario } from "./styles";

import api from "../../config/configApi";

export const Visualizar = (props) => {
  const [data, setData] = useState([]);
  const [id] = useState(props.match.params.id);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  useEffect(() => {
    setTimeout(() => {
      const getUsuario = async () => {
        await api
          .get("/usuario/" + id)
          .then((response) => {
            if (response.data.error) {
              setStatus({
                type: "error",
                mensagem: response.data.message,
              });
            } else {
              setData(response.data.usuario);
            }
          })
          .catch(() => {
            setStatus({
              type: "error",
              mensagem: "Erro: Tente mais tarde!",
            });
          });
      };
      getUsuario();
    }, 2000);
  }, [id]);

  return (
    <Container>
      <Menu />

      <ConteudoTitulo>
        <Titulo>Visualizar Usuário</Titulo>
        <BotaoAcao>
          <Link to="/listar">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>{" "}
          <Link to={"/editar/" + id}>
            <ButtonPrimary>Editar</ButtonPrimary>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      <Conteudo>
        <hr m-1 />
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

        <Table striped hover>
          <thead>
            <tr className="text-center">
              <th style={{ borderTopLeftRadius: "10px" }}>ID</th>
              <th>Nome</th>
              <th style={{ borderTopRightRadius: "10px" }}>Usuário</th>

            </tr>
          </thead>

          <tbody>
            <tr className="text-center">
              <td>{data.id}</td>
              <td>{data.nome}</td>
              <td>{data.email}</td>
            </tr>
          </tbody>
        </Table>
      </Conteudo>
    </Container>
  );
};

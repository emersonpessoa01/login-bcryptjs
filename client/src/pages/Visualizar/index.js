import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { Link } from "react-router-dom";
import api from "../../config/index";
import { ConteudoUsuario } from "./styles";
import {
  Container,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  AlertDanger,
  AlertSuccess,
  ButtonInfo,
  Conteudo,
} from "../../styles/Custom_adm";

export const Visualizar = (props) => {
  const [id] = useState(props.match.params.id);
  // console.log(id)
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const getUsuario = async () => {
    await api
      .get("/usuario" + id)
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

  useEffect(() => {
    getUsuario();
  }, [id]);

  return (
    <Container>
      <Menu />

      <ConteudoTitulo>
        <Titulo>Visualizar usuários</Titulo>
        <BotaoAcao>
          <Link to="/listar">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      <Conteudo>
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
        <ConteudoUsuario>ID: {data.id}</ConteudoUsuario>
        <ConteudoUsuario>Nome: {data.nome}</ConteudoUsuario>
        <ConteudoUsuario>Email: {data.email}</ConteudoUsuario>
      </Conteudo>
    </Container>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";

import { Spinner } from "reactstrap";

import { ButtomWarningEdit } from "./styles";

import {
  Container,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  AlertDanger,
  AlertSuccess,
  ButtonInfo,
  Conteudo,
  Form,
  Label,
  Input,
  ButtonPrimary,
} from "../../styles/Custom_adm";

import api from "../../config/configApi";

export const Editar = (props) => {
  const [id] = useState(props.match.params.id);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const editUsuario = async (e) => {
    e.preventDefault();

    setStatus({
      formSave: true,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    await api
      .put("/usuario", { id, nome, email, senha }, { headers })
      .then((response) => {
        if (response.data.error) {
          setStatus({
            formSave: false,
            type: "error",
            mensagem: response.data.message,
          });
        } else {
          setStatus({
            formSave: false,
            type: "success",
            mensagem: response.data.message,
          });
        }
      })
      .catch(() => {
        setStatus({
          formSave: false,
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      });
  };

  useEffect(() => {
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
            setNome(response.data.usuario.nome);
            setEmail(response.data.usuario.email);
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
  }, [id]);

  return (
    <Container>
      <Menu />
      <ConteudoTitulo>
        <Titulo>Editar Usuário</Titulo>
        <BotaoAcao>
          <Link to="/listar">
            <ButtonPrimary>Listar</ButtonPrimary>
          </Link>{" "}
          <Link to={"/visualizar/" + id}>
            <ButtonInfo>Visualizar</ButtonInfo>
          </Link>{" "}
        </BotaoAcao>
      </ConteudoTitulo>

      <Conteudo>
        {status.type === "error" ? (
          <AlertDanger>
            <i className="far fa-frown lg">{status.mensagem}</i>
          </AlertDanger>
        ) : (
          ""
        )}
        {status.type === "success" ? (
          <AlertSuccess>
            <i className="far fa-grin-wink lg">{status.mensagem}</i>
          </AlertSuccess>
        ) : (
          ""
        )}

        <Form onSubmit={editUsuario}>
          <Label>Nome: </Label>
          <Input
            autoFocus
            type="text"
            name="nome"
            placeholder="Nome do usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <Label>E-mail: </Label>
          <Input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label>Senha: </Label>
          <Input
            type="password"
            name="senha"
            placeholder="Senha para acessar o administrativo"
            autoComplete="on"
            onChange={(e) => setSenha(e.target.value)}
          />

          {status.formSave ? (
            <ButtomWarningEdit type="submit" disabled size="sm">
              <Spinner center color="warning" size="sm" />
            </ButtomWarningEdit>
          ) : (
            <ButtomWarningEdit type="submit" size="sm">
              Editar
            </ButtomWarningEdit>
          )}
        </Form>
      </Conteudo>
    </Container>
  );
};

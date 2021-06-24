import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";

import { Spinner } from "reactstrap";

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
  ButtonSuccess,
} from "../../styles/Custom_adm";

import api from "../../config/configApi";

export const Cadastrar = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  //const valorInput =(e)=>setUsuario({ ...dadosUsuario, [e.target.name]: e.target.value})

  const cadUsuario = async (e) => {
    e.preventDefault();

    const data = {
      nome,
      email,
      senha,
    };

    setStatus({
      formSave: true,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    if (nome !== "" & email !== "" && senha !== "") {
      await api
        .post("/usuario", data, { headers })
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
    } else {
      setStatus({
        formSave: false,
        type: "error",
        mensagem: "Atenção: Por favor, preencha todos os dados!",
      });
    }
  };

  return (
    <Container>
      <Menu />

      <ConteudoTitulo>
        <Titulo>Cadastrar Usuário</Titulo>
        <BotaoAcao>
          <Link to="/listar">
            <ButtonInfo>Listar</ButtonInfo>
          </Link>
        </BotaoAcao>
      </ConteudoTitulo>

      <Conteudo>
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

        <Form onSubmit={cadUsuario}>
          <Label>Nome: </Label>
          <Input
            type="nome"
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {status.formSave ? (
            <ButtonSuccess type="submit" disabled size="lg">
              <Spinner color="success" size="sm" />
            </ButtonSuccess>
          ) : (
            <ButtonSuccess type="submit" size="lg">
              Cadastrar
            </ButtonSuccess>
          )}
        </Form>
      </Conteudo>
    </Container>
  );
};

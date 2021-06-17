import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";

import {Spinner} from "reactstrap"

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
} from "../../styles/custom_adm";

import api from "../../config/configApi";

export const Cadastrar = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [status, setStatus] = useState({
    formSave:false,
    type: "",
    mensagem: "",
  });

  const valorInput = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const cadUsuario = async (e) => {
    e.preventDefault();

    setStatus({
    formSave:true,

    })

    const headers = {
      "Content-Type": "application/json",
    };

    await api
      .post("/usuario", usuario, { headers })
      .then((response) => {
        if (response.data.error) {
          setStatus({
            formSave:false,
            type: "error",
            mensagem: response.data.message,
          });
        } else {
          setStatus({
            formSave:false,
            type: "success",
            mensagem: response.data.message,
          });
        }
      })
      .catch(() => {
        setStatus({
          formSave:false,
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      });
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
            type="text"
            name="nome"
            placeholder="Nome do usuário"
            onChange={valorInput}
          />

          <Label>E-mail: </Label>
          <Input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            onChange={valorInput}
          />

          <Label>Senha: </Label>
          <Input
            type="password"
            name="senha"
            placeholder="Senha para acessar o administrativo"
            autoComplete="on"
            onChange={valorInput}
          />

            {status.formSave ? (
            <ButtonSuccess outline type="submit" disabled size="lg">
              Cadastrando...<Spinner color="success" size="lg" />
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

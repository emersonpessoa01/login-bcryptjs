import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import { Spinner } from "reactstrap";

import {
  Container,
  FormLogin,
  Titulo,
  Input,
  ButtomPrimary,
  AlertDanger,
  AlertSuccess,
  TituloFooter,
} from "./styles";

import { Context } from "../../Context/AuthContext";

import api from "../../config/configApi";

export const Login = () => {
  const history = useHistory();

  const { signIn } = useContext(Context);

  const [dadosUsuario, setUsuario] = useState({
    usuario: "",
    senha: "",
  });

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const valorInput = (e) =>
    setUsuario({ ...dadosUsuario, [e.target.name]: e.target.value });

  const loginSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      formSave: true,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    api
      .post("/login", dadosUsuario, { headers })
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
          // Salvar o token localStorage
          localStorage.setItem("token", JSON.stringify(response.data.token));
          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
          signIn(true);
          setTimeout(() => {
            return history.push("/dashboard");
          }, 3500);
        }
      })
      .catch(() => {
        setStatus({
          formSave: false,
          type: "error",
          mensagem: "Erro: Usuário ou senha a senha incorreta!",
        });
      });
  };

  return (
    <Container>
      <FormLogin>
        {/* Titulo da página */}
        <Titulo>Login</Titulo>

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

        <form onSubmit={loginSubmit}>
          <Input
            autoFocus
            type="text"
            name="usuario"
            placeholder="Usuário"
            onChange={valorInput}
          />

          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            autoComplete="on"
            onChange={valorInput}
          />
          {status.formSave ? (
            <ButtomPrimary type="submit" disabled>
              Logando...
              <Spinner size="sm" color="success" />
            </ButtomPrimary>
          ) : (
            <ButtomPrimary type="submit" >
              Login
            </ButtomPrimary>
          )}
        </form>
        <TituloFooter>Copyright 2021©emersonpessoa</TituloFooter>
      </FormLogin>
    </Container>
  );
};

import React, { useState } from "react";

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

// import { Context } from "../../Context/AuthContext";

import api from "../../config/configApi";

export const CadastrarUsuario = () => {
  const history = useHistory();

  // const { signIn } = useContext(Context);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const cadSubmit = async (e) => {
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
    if ((nome !== "") & (email !== "") & (senha !== "")) {
      api
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
            // signIn(true);
            setTimeout(() => {
              return history.push("/");
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
    } else {
      setStatus({
        formSave: false,
        type: "error",
        mensagem: "Erro: Por favor, preencha todos os dados!",
      });
    }
  };

  return (
    <Container>
      <FormLogin>
        {/* Titulo da página */}
        <Titulo>SignUp</Titulo>

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

        <form onSubmit={cadSubmit}>
          <Input
            autoFocus
            type="text"
            name="nome"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="nome"
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {status.formSave ? (
            <ButtomPrimary type="submit" disabled size="lg">
              <Spinner color="light" size="sm" />
            </ButtomPrimary>
          ) : (
            <ButtomPrimary type="submit" size="sm">
              SignUp
            </ButtomPrimary>
          )}
        </form>
        <TituloFooter>Copyright 2021© emersonpessoa</TituloFooter>
      </FormLogin>
    </Container>
  );
};

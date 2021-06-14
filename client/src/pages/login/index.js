import React, { useState, useContext } from "react";
import api from "../../config/index";
import { Context } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  Container,
  FormLogin,
  Titulo,
  Input,
  ButtomPrimary,
  AlertDanger,
  AlertSuccess
} from "./styles";

export const Login = () => {
  const history = useHistory();
  const { authenticated, signIn } = useContext(Context);
  console.log("Situação: " + authenticated);

  const [dadosUsuario, setDadosUsuario] = useState({
    usuario: "",
    senha: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) => {
    const { name, value } = e.target;
    setDadosUsuario({
      ...dadosUsuario,
      [name]: value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    // console.log(dadosUsuario.usuario);
    // console.log(dadosUsuario.senha);

    const headers = {
      "Content-Type": "application/json",
    };

    api
      .post("/login", dadosUsuario, { headers })
      .then((response) => {
        // console.log(response.data.error);
        // console.log(response.data.message);
        // console.log(response.data.token);
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
          //Salvar o token no localStorage
          localStorage.setItem("token", JSON.stringify(response.data.token));
          api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
          signIn();
          setTimeout(() => {
            return history.push("/dashboard");
          }, 3500);
        }
      })
      .catch(() => {
        setStatus({
          type: "error",
          mensagem: "Erro: Tente mais tarde!",
        });
      });
  };

  return (
    <Container>
      <FormLogin>
        <Titulo>Login</Titulo>
        <hr />
        {status.type === "error" ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
        {status.type === "success" ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
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
            autoComplete="on" //para eliminar o alerta
            onChange={valorInput}
          />
          <ButtomPrimary type="submit">Acessar</ButtomPrimary>
        </form>
      </FormLogin>
    </Container>
  );
};

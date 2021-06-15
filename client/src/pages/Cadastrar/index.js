import React, { useState } from "react";
import Menu from "../../components/Menu";
import { Link } from "react-router-dom";
import api from "../../config/index";
import {
  Container,
  ConteudoTitulo,
  Titulo,
  BotaoAcao,
  AlertDanger,
  AlertSuccess,
  ButtonInfo,
  Form,
  Conteudo,
  Label,
  Input,
  ButtonSuccess,
} from "../../styles/Custom_adm";

export const Cadastrar = () => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valorInput = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const cadUsuario = async (e) => {
    e.preventDefault();
    console.log(usuario.nome);

    const headers = {
      "Type-Content": "application/json",
    };

    await api
      .post("/usuario", usuario, { headers })
      .then((response) => {
        // console.log(response.data)
        if (response.data.error) {
          setStatus({
            type: "error",
            message: response.data.error.message,
          });
        } else {
          setStatus({
            type: "success",
            message: response.data.error.message,
          });
        }
      })
      .catch(() => {
        setStatus({
          type: "error",
          message: "Erro: Tente mais tarde!",
        });
      });
  };

  return (
    <Container>
      <Menu />

      <ConteudoTitulo>
        <Titulo>Cadastrar usuário</Titulo>
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

        <Form onSubmit={cadUsuario}>
          <Label>Nome</Label>
          <Input
            autoFocus
            type="text"
            name="nome"
            placeholder="Nome do usuário"
            onChange={valorInput}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email do usuário"
            onChange={valorInput}
          />
          <Input
            type="password"
            name="senha"
            placeholder="Senha acessar o Adm"
            onChange={valorInput}
            autoComplete="on"
          />
          <ButtonSuccess type="submit">Cadastrar</ButtonSuccess>
        </Form>
      </Conteudo>
    </Container>
  );
};

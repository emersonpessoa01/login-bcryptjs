import React, { useState } from "react";
import { Link } from "react-router-dom";

import Menu from "../../components/Menu";

import { Spinner } from "reactstrap";

import { useFormik } from "formik";

import "./helpers.css";

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
  ButtonSuccess,
} from "../../styles/Custom_adm";

import * as yup from "yup";

import api from "../../config/configApi";
import { Input, ValidationStyled } from "./styles";

export const Cadastrar = () => {
  const validationSchema = yup.object({
    nome: yup
      .string()
      .min(2, "A senha deve conter pelo menos 8 caracteres")
      .required("Campo obrigatório"),
    email: yup
      .string()
      .email("O usuário deve ser um email válido")
      .required("Campo obrigatório"),
    senha: yup
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .required("Campo obrigatório"),
  });

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      usuario: "",
      senha: "",
    },
    validationSchema,
    onSubmit(values) {
      setStatus({ formSave: true });

      const headers = {
        "Content-Type": "application/json",
      };

      api
        .post("/usuario", values)
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
            console.log(response.data.message);
          }
        })
        .catch(() => {
          setStatus({
            formSave: false,
            type: "error",
            mensagem: "Erro: Tente mais tarde",
          });
        });
    },
  });

  return (
    <Container>
      <Menu />

      <ConteudoTitulo></ConteudoTitulo>
      <BotaoAcao>
        <Link to="/listar">
          <ButtonInfo>Listar</ButtonInfo>
        </Link>
      </BotaoAcao>
      <Titulo>Cadastrar Usuário</Titulo>

      <Conteudo>
        <Form onSubmit={handleSubmit}>
          <div className="promotion-form__group">
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

            <Label>Nome: </Label>
            <Input
              autoFocus
              type="text"
              name="nome"
              placeholder="Nome do usuário"
              values={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.nome && touched.nome ? "text-input error" : "text-input"
              }
            />
            {errors.nome && touched.nome ? (
              <ValidationStyled>{errors.nome}</ValidationStyled>
            ) : null}

            <Label>E-mail: </Label>
            <Input
              type="email"
              name="email"
              placeholder="E-mail do usuário"
              values={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.email && touched.email ? (
              <ValidationStyled>{errors.email}</ValidationStyled>
            ) : null}

            <Label>Senha: </Label>
            <Input
              type="password"
              name="senha"
              placeholder="Senha para acessar o administrativo"
              values={values.senha}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.senha && touched.senha
                  ? "text-input error"
                  : "text-input"
              }
            />
            {errors.senha && touched.senha ? (
              <ValidationStyled>{errors.senha}</ValidationStyled>
            ) : null}

            {status.formSave ? (
              <ButtonSuccess type="submit" disabled size="lg">
                <Spinner color="success" size="sm" />
              </ButtonSuccess>
            ) : (
              <ButtonSuccess type="submit" size="sm">
                Login
              </ButtonSuccess>
            )}
          </div>
        </Form>
      </Conteudo>
    </Container>
  );
};

import React, { useState, useContext } from "react";

import { Link, useHistory } from "react-router-dom";

import { Spinner } from "reactstrap";

import { useFormik } from "formik";
import * as yup from "yup";

import "./helpers.css";

import {
  Container,
  FormLogin,
  Titulo,
  Input,
  ButtomPrimary,
  AlertDanger,
  AlertSuccess,
  TituloFooter,
  ValidationStyled,
  InputError,
} from "./styles";

import { Context } from "../../Context/AuthContext";

import api from "../../config/configApi";

export const Login = () => {
  const history = useHistory();

  const { signIn } = useContext(Context);

  const validationSchema = yup.object({
    usuario: yup
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
      // alert(JSON.stringify(values));
      setStatus({ formSave: true });

      const headers = {
        "Content-Type": "application/json",
      };
      api
        .post("/login", values, { headers })
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
            mensagem: "Erro: Tente mais tarde",
          });
        });
    },
  });

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

        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            type="text"
            name="usuario"
            placeholder="Usuário"
            onChange={handleChange}
            autoComplete="on"
            values={values.usuario}
            onBlur={handleBlur}
            className={
              errors.usuario && touched.usuario
                ? "text-input error"
                : "text-input"
            }
          />
          {errors.usuario && touched.usuario ? (
            <ValidationStyled>{errors.usuario}</ValidationStyled>
          ) : null}
          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            autoComplete="on"
            onChange={handleChange}
            values={values.senha}
            onBlur={handleBlur}
            className={
              errors.senha && touched.senha ? "text-input error" : "text-input"
            }
          />
          {errors.senha && touched.senha ? (
            <ValidationStyled>{errors.senha}</ValidationStyled>
          ) : null}
          {status.formSave ? (
            <ButtomPrimary type="submit" disabled size="lg">
              <Spinner color="light" size="sm" />
            </ButtomPrimary>
          ) : (
            <ButtomPrimary type="submit" size="sm">
              Login
            </ButtomPrimary>
          )}
          <Link to="/cadastrarUsuario">
            <ButtomPrimary>Cadastrar</ButtomPrimary>
          </Link>
        </form>
        <TituloFooter>Copyright 2021© emersonpessoa</TituloFooter>
      </FormLogin>
    </Container>
  );
};

import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";

import { Spinner } from "reactstrap";

import * as yup from "yup";

import { useFormik } from "formik";

import "./helpers.css";

import {
  Container,
  FormLogin,
  Titulo,
  ButtomPrimary,
  AlertDanger,
  AlertSuccess,
  TituloFooter,
  ValidationStyled,
  Input
} from "./styles";


// import { Context } from "../../Context/AuthContext";

import api from "../../config/configApi";

export const CadastrarUsuario = () => {
  const history = useHistory();

  // const { signIn } = useContext(Context);

  const [status, setStatus] = useState({
    formSave: false,
    type: "",
    mensagem: "",
  });

  const validationSchema = yup.object({
    nome: yup
      .string()
      .min(2, "O nome deve conter pelo menos 2 caracteres")
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

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      nome: "",
      email: "",
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
        .post("/usuario", values, { headers })
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
            setTimeout(() => {
              return history.push("/");
            }, 3500);
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

        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            type="text"
            name="nome"
            placeholder="Nome"
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
          <Input
            type="email"
            name="email"
            placeholder="Email"
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.email && touched.email ? "text-input error" : "text-input"
            }
          />
          {errors.email && touched.email ? (
            <ValidationStyled>{errors.email}</ValidationStyled>
          ) : null}

          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            values={values.senha}
            onChange={handleChange}
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
              SignUp
            </ButtomPrimary>
          )}
          <Link
            style={{
              textDecoration: "none",
            }}
            to={"/"}
          >
            Voltar
          </Link>
        </form>
        <TituloFooter>Copyright 2021© emersonpessoa</TituloFooter>
      </FormLogin>
    </Container>
  );
};

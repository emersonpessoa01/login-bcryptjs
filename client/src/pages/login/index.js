import React, { useState } from "react";
import axios from "axios";
import { api } from "../../config/index";

export const Login = () => {
  const [dadosUsuario, setDadosUsuario] = useState({
    usuario: "",
    senha: "",
  });

  const valorInput = (e) => {
    const { name, value } = e.target;
    setDadosUsuario({
      ...dadosUsuario,
      [name]: value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    console.log(dadosUsuario.usuario);
    console.log(dadosUsuario.senha);

    const headers = {
      "Content-Type": "application/json",
    };

    await axios
      .post(api + "/login", dadosUsuario, { headers })
      .then((response)=>{
        console.log(response.data.error)
        console.log(response.data.message)
        console.log(response.data.token)
      })
      .catch(()=>{
        console.log("Erro: Usuário ou senha incorreta!")
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginSubmit}>
        <input
          autoFocus
          type="text"
          name="usuario"
          placeholder="Digite o usuário"
          onChange={valorInput}
        />
        <br />
        <br />

        <input
          type="password"
          name="senha"
          placeholder="Digite a senha"
          onChange={valorInput}
        />
        <br />
        <br />

        <button type="submit">Acessar</button>
      </form>
    </div>
  );
};

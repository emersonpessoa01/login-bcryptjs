const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
// const { promisify } = require("util");
const { eAdmin } = require("./middlewares/auth");
const db = require("./models/db");
const Usuario = require("./models/Usuario");

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER",
    "Content-Type",
    "Authorization"
  );
  app.use(cors());
  next();
});

app.get("/usuarios", eAdmin, (_, res) => {
  return res.json({
    error: false,
    mensagem: "Listar usuários!",
  });
});

app.post("/login", async (req, res) => {
  const usuario = await Usuario.findOne({
    where: {
      email: req.body.usuario,
    },
  });
  if (usuario === null) {
    return res.json({
      error: true,
      mensagem: "Error: Usuário não encontrado!",
    });
  }

  //para comparar a senha no req.body com a senha criptografada no db
  if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
    return res.json({
      error: true,
      mensagem: "Error: Senha inválida!",
    });
  }

  //verificando os dados estáticos
  // const { id } = 1; //id estático
  // var privateKey = process.env.SECRET; //somente por meio dessa chave que consegue validar o token
  var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
    // expiresIn: 600, //10min
    expiresIn: "7d", //7 dias
  });

  return res.json({
    error: false,
    mensagem: "Login realizado com sucesso!",
    token,
    // dados: req.body,
  });
});

app.post("/usuario", async (req, res) => {
  console.log(req.body);
  // return res.json({
  //   dados: req.body,
  let dados = req.body;
  dados.senha = await bcrypt.hash(dados.senha, 8);

  await Usuario.create(dados)
    .then(() => {
      return res.json({
        error: false,
        mensagem: "Usuário cadastrado com sucesso!",
      });
    })
    .catch((err) => {
      return res.json({
        error: true,
        mensagem: "Error: Usuário não cadastrado com sucesso!" + err,
      });
    });
});

app.listen(3000, () => {
  console.log(
    "Servidor iniciado na porta 3000: http://localhost:3000/usuarios"
  );
});

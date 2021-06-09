const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
// const { promisify } = require("util");
const { eAdmin } = require("./middlewares/auth");

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

app.post("/login", (req, res) => {
  //verificando os dados estáticos 
  if (req.body.usuario === "emersonpessoa" && req.body.senha === "123456") {
    const { id } = 1;
    var privateKey = process.env.SECRET; //somente por meio dessa chave que consegue validar o token
    var token = jwt.sign({ id }, privateKey, {
      // expiresIn: 600, //10min
      expiresIn: "7d", //7 dias
    });

    return res.json({
      error: false,
      mensagem: "Login válido!",
      token,
      // dados: req.body,
    });
  }
  return res.json({
    error: true,
    mensagem: "Login ou senha incorreta!",
  });
});

app.listen(3000, () => {
  console.log(
    "Servidor iniciado na porta 3000: http://localhost:3000/usuarios"
  );
});

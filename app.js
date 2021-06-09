const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const { promisify } = require("util");

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

app.get("/usuarios", validartoken, (_, res) => {
  return res.json({
    error: false,
    mensagem: "Listar usuários!",
  });
});

app.post("/login", (req, res) => {
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

//verificar se o token é válido
async function validartoken(req, res, next) {
  const authHeader = req.headers.authorization;
  const [_, token] = authHeader.split(" ");

  if (!token) {
    return res.json({
      error: true,
      mensagem: "Erro: Necessário realizar o login para acessar a página!",
    });
  }

  //para validar token
  try {
    const decode = await promisify(jwt.verify)(token, process.env.SECRET);
    req.userId = decode.id; //p/ recuperar o id
    return next();
  } catch (err) {
    return res.json({
      error: true,
      mensagem: "Erro: Login ou senha inválida!",
    });
  }
}

app.listen(3000, () => {
  console.log(
    "Servidor iniciado na porta 3000: http://localhost:3000/usuarios"
  );
});

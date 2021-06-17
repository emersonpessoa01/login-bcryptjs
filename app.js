const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
// const { promisify } = require("util");
const { eAdmin } = require("./middlewares/auth");
const db = require("./models/db");
const Usuario = require("./models/Usuario");

app.use("/files", express.static(path.resolve(__dirname, "public", "upload")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

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

//Visualizar todos os usuários
app.get("/usuarios", eAdmin, async (_, res) => {
  await Usuario.findAll({
    order: [["id", "DESC"]],
  })
    .then((usuarios) => {
      return res.json({
        error: false,
        message: "Usuário encontrado com sucesso!",
        usuarios,
      });
    })
    .catch(() => {
      return res.json({
        error: true,
        message: "Erro: Nenhum usuário encontrado!",
      });
    });
});

//Visualizar um único usuário e add eAdmin para que usuario esteja logado
app.get("/usuario/:id", eAdmin, async (req, res) => {
  await Usuario.findByPk(req.params.id)
    .then((usuario) => {
      return res.json({
        error: false,
        message: "Usuário encontrado com sucesso!",
        usuario,
      });
    })
    .catch(() => {
      return res.json({
        error: true,
        message: "Erro: Usuário não encontrado com sucesso!",
      });
    });
});

//Editar usuário
app.put("/usuario", eAdmin, async (req, res) => {
  await sleep(3000);

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  let dados = req.body;
  dados.senha = await bcrypt.hash(dados.senha, 8);

  await Usuario.update(dados, {
    where: {
      id: dados.id,
    },
  })
    .then(() => {
      return res.json({
        error: false,
        message: "Usuário editado com sucesso!",
      });
    })
    .catch(() => {
      return res.json({
        error: true,
        message: "Error: Usuário não editado com sucesso!",
      });
    });

  // return res.json({
  //   dados,
  // });
});

//Apagar usuário
app.delete("/usuario/:id", eAdmin, async (req, res) => {
  let id = req.params.id;
  await Usuario.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      return res.json({
        error: false,
        message: "Usuário apagado com sucesso!",
        dados: id,
      });
    })
    .catch(() => {
      return res.json({
        error: true,
        message: "Erro: Usuário não apagado com sucesso!",
      });
    });
});

//Logar usuários
app.post("/login", async (req, res) => {
  await sleep(3000);

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const usuario = await Usuario.findOne({
    where: {
      email: req.body.usuario,
    },
  });
  if (usuario === null) {
    return res.json({
      error: true,
      message: "Error: Usuário incorreto!",
    });
  }

  //para comparar a senha no req.body com a senha criptografada no db
  if (!(await bcrypt.compare(req.body.senha, usuario.senha))) {
    return res.json({
      error: true,
      message: "Error: Senha incorreta!",
    });
  }

  var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
    expiresIn: "7d", //7 dias
  });

  return res.json({
    error: false,
    message: "Login realizado com sucesso!",
    token,
    // dados: req.body,
  });
});

//Cadastrar usuário um por vez
app.post("/usuario", async (req, res) => {
  await sleep(3000);

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  let dados = req.body;
  dados.senha = await bcrypt.hash(dados.senha, 8);

  await Usuario.create(dados)
    .then(() => {
      return res.json({
        error: false,
        message: "Usuário cadastrado com sucesso!",
      });
    })
    .catch((err) => {
      return res.json({
        error: true,
        message: "Error: Usuário não cadastrado com sucesso!" + err,
      });
    });
});

app.get("/", (req, res) => {
  res.json({
    mensagem: "Olá, Emerson Pessoa",
  });
});

const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(
    `Servidor iniciado na porta ${APP_PORT}: http://localhost:${APP_PORT}`
  );
});

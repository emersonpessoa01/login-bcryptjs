const express = require("express");
const app = express();

app.get("/usuarios", (_, res) => {
  res.json({
    error: false,
    mensagem: "Listar usuários!"
  });
});

app.post("/login", (_, res) => {
  res.json({
    error: false,
    mensagem: "Página de login!"
  });
});

app.listen(3000,()=>{
  console.log("Servidor iniciado na porta 3000: http://localhost:3000")
});

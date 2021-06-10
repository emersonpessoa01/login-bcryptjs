const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

module.exports = {
  //verificar se o token é válido
  eAdmin: async function (req, res, next) {
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
  },
};
 
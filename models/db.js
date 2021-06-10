const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("react_imersao_8_0", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com banco de dados realizado com sucesso!");
  })
  .catch((err) => {
    console.log("Erro: Conexão com banco de dados não realizado com sucesso!");
  });

module.exports = sequelize;

const Sequelize = require("sequelize");
const db = require("./db");

//criar a model Usuario
const Usuario  = db.define("Usuarios",{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: true,

  }
})

//Caso não exista a tebela, crie a tabela no MySQL
Usuario.sync()

module.exports = Usuario

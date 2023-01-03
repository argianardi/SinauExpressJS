let Sequelize = require("sequelize");

let db = new Sequelize("kuliah", "root", "zero", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = db;

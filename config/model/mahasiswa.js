const Sequelize = require("sequilize");
const db = require("../database/mysql");

let mahasiswa = db.define(
  "mahasiswa",
  {
    nim: Sequelize.INTEGER,
    nama: Sequelize.STRING,
    jurusan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamp: false,
  }
);

mahasiswa.removeAttribute("id");
module.exports = mahasiswa;

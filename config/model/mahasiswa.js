const Sequelize = require("sequelize");
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
    timestamps: false,
  }
);

mahasiswa.removeAttribute("id");
module.exports = mahasiswa;

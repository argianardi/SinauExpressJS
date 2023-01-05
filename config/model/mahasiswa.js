const Sequelize = require("sequelize");
const db = require("../database/mysql");

let mahasiswa = db.define(
  "mahasiswa",
  {
    nim: Sequelize.INTEGER,
    nama: Sequelize.STRING,
    jurusan: Sequelize.STRING,
    alamat: Sequelize.STRING,
    angkatan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

db.sync({ alter: true })
  .then(() => {
    console.log("Mahasiswa table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create table:", error);
  });

mahasiswa.removeAttribute("id");
module.exports = mahasiswa;

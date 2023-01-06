const Sequelize = require("sequelize");
const db = require("../database/mysql");

let jurusan = db.define(
  "jurusan",
  {
    kd_jurusan: { type: Sequelize.INTEGER, primaryKey: true },
    nama_jurusan: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

db.sync({ alter: true })
  .then(() => {
    console.log("Jurusan table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create table:", error);
  });

jurusan.removeAttribute("id");
module.exports = jurusan;

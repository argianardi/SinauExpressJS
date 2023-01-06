const Sequelize = require("sequelize");
const db = require("../database/mysql");
//input jurusan table
const jurusan = require("./jurusan");

let mahasiswa = db.define(
  "mahasiswa",
  {
    nim: { type: Sequelize.INTEGER, primaryKey: true },
    nama: Sequelize.STRING,
    kd_jurusan: Sequelize.STRING,
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

// add FK to  jurusan table, reference to kd_jurusan in jurusan table
mahasiswa.hasOne(jurusan, { foreignKey: "kd_jurusan" });
mahasiswa.belongsTo(jurusan, { foreignKey: "kd_jurusan" });

mahasiswa.removeAttribute("id");
module.exports = mahasiswa;

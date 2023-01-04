const express = require("express");
const router = express.Router();
const db = require("../config/database/mysql");
const controller = require("../controller/index");

router.get("/", controller.mahasiswa.getAll);

router.post("/", (req, res, next) => {
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;
  var sql =
    "INSERT INTO mahasiswa (nama, jurusan) values ('" +
    nama +
    "', '" +
    jurusan +
    "')";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      message: "Data mahasiswa berhasil ditambahkan",
    });
  });
});

router.get("/:nim", controller.mahasiswa.getOne);

router.put("/:nim", (req, res, next) => {
  const nim = req.params.nim;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;
  let sql =
    "UPDATE mahasiswa SET nama = '" +
    nama +
    "', jurusan = '" +
    jurusan +
    "' WHERE nim = " +
    nim;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      message: "Data mahasiswa berhasil diupdate",
    });
  });
});

router.delete("/:nim", (req, res, next) => {
  const nim = req.params.nim;
  let sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      message: "Data mahasiswa berhasil dihapus",
    });
  });
});

router.get("/filter/by", (req, res, next) => {
  const nama = req.query.nama;
  var sql = `SELECT * FROM mahasiswa WHERE nama= ${nama}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).json({
        message: "Data mahasiswa ditemukan",
        data: result,
      });
    } else {
      res.status(200).json({
        message: "Data mahasiswa tidak ditemukan",
        data: result,
      });
    }
  });
});

module.exports = router;

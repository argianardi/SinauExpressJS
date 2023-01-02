const express = require("express");
const router = express.Router();
const db = require("../config/mysql");

router.get("/", (req, res, next) => {
  var sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      message: "get method mahasiswa",
      data: result,
    });
  });
});

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

router.get("/:nim", (req, res, next) => {
  const nim = req.params.nim;
  var sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json({
      message: "Mahasiswa ditemukan",
      data: result,
    });
  });
});

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

module.exports = router;

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
  const mahasiswa = {
    nim: req.body.nim,
    nama: req.body.nama,
  };
  res.status(200).json({
    message: "post method mahasiswa",
    data: mahasiswa,
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

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "get method mahasiswa",
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
  if (nim === "12345") {
    res.status(200).json({
      message: "NIM 12345",
    });
  } else {
    res.status(200).json({
      message: "NIM Lain",
    });
  }
});

module.exports = router;

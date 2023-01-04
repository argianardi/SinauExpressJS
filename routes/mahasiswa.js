const express = require("express");
const router = express.Router();
const db = require("../config/database/mysql");
const controller = require("../controller/index");

// get all mahsiswa
router.get("/", controller.mahasiswa.getAll);

// get one mahasiswa
router.get("/:nim", controller.mahasiswa.getOne);

//post mahasiswa
router.post("/", controller.mahasiswa.post);

module.exports = router;

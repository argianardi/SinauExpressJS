const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

// get all mahsiswa
router.get("/", controller.mahasiswa.getAll);

// getSearch (get req use req.query)
router.get("/search", controller.mahasiswa.getSearch);

// get one mahasiswa
router.get("/:nim", controller.mahasiswa.getOne);

//post mahasiswa
router.post("/", controller.mahasiswa.post);

//put mahasiswa
router.put("/:nim", controller.mahasiswa.put);

// delete mahasiswa
router.delete("/:nim", controller.mahasiswa.delete);

module.exports = router;

const model = require("../config/model/index");
const controller = {};

//get request all mahasiswa
controller.getAll = async function (req, res) {
  try {
    let mahasiswa = await model.mahasiswa.findAll();
    if (mahasiswa.length > 0) {
      res.status(200).json({
        message: "Get method mahasiswa",
        data: mahasiswa,
      });
    } else {
      res.status(200).json({
        message: "Mahasiswa not found",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

//get request one mahasiswa
controller.getOne = async function (req, res) {
  try {
    let mahasiswa = await model.mahasiswa.findAll({
      where: {
        nim: req.params.nim,
      },
    });

    if (mahasiswa.length > 0) {
      res.status(200).json({
        message: "Data mahasiswa ditemukan",
        data: mahasiswa,
      });
    } else {
      res.status(200).json({
        message: "Tidak ada data",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = controller;

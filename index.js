const express = require("express");
const app = express();
const mahasiswaRoutes = require("./routes/mahasiswa");

app.use("/mahasiswa", mahasiswaRoutes);

module.exports = app;

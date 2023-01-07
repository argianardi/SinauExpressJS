const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const basicAuth = require("express-basic-auth"); //import basic-auth
const helmet = require("helmet"); //import helmet

//add helmet
app.use(helmet());

//Definisikan user
// app.use(
//   basicAuth({
//     users: { admin: "password" },
//     unauthorizedResponse: basicAuthResponse,
//   })
// );

// handle Unauthorized
// function basicAuthResponse(req) {
//   return req.auth
//     ? "Credentials " + req.auth.user + ": " + req.auth.password + " rejected"
//     : "Unauthorized";
// }

const mahasiswaRoutes = require("./routes/mahasiswa");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/mahasiswa", mahasiswaRoutes);

app.use((req, res, next) => {
  const error = new Error("Tidak ditemukan");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;

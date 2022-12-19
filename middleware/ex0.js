const express = require("express");
const port = 5000;
const app = express();

// --------------------Deklarasi function Midleware ------------
const middle1 = (req, res, next) => {
  console.log("Middle1");
  next();
};

const middle2 = (req, res, next) => {
  console.log("Middle2");
  next();
};

const middle3 = (req, res, next) => {
  console.log("Middle3");
  next();
};

const middle4 = (req, res, next) => {
  console.log("Middle4");
  next();
};

// -------------------- Memanggil function Midleware ------------
app.use(middle4);
app.use(middle3);
app.use(middle2);
app.use(middle1);

// -------------------- Request  ------------
app.get("/", (req, res) => {
  res.send("Hello world! Welcome to the Express Js");
});

app.listen(port, () => {
  console.log(`server ${port} is running...`);
});

const express = require("express");
const app = express();

const port = 3003;

const myLogger = function (req, res, next) {
  console.log("Logged");
  next();
};

app.use(myLogger);

app.get("/", (req, res) => {
  res.send("Hallo World");
  console.log("hello");
});

app.listen(port, function () {
  console.log(`server ${port} is okay`);
});

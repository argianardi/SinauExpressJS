const express = require("express");
const app = express();

const requiereJsonContent = () => {
  return (req, res, next) => {
    if (req.headers["content-type"] !== "application/json") {
      res.status(400).send("server required application/jason");
    } else {
      next();
    }
  };
};

app.post("/", requiereJsonContent(), (req, res, next) => {
  res.send("You sent JSON");
});

app.listen(5000, () => {
  console.log("server is runing...");
});

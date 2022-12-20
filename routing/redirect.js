const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.redirect("http://expressjs.com/");
});

app.listen(port, () => {
  console.log(`Server ${port} is runing...`);
});

const express = require("express");
const app = express();

app.get("/error", (req, res) => {
  throw new Error("It is error");
});

app.listen(4001, () => {
  console.log("Server 4001 is running...");
});

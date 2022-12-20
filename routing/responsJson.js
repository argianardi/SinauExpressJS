const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  const akatsuki = {
    id: 1,
    name: "Pain",
  };
  res.json(akatsuki);
});

app.listen(port, () => {
  console.log(`${port} is runing...`);
});

const express = require("express");
const app = express();
const port = 5001;

app.get("/", (req, res) => {
  res.send("Home");
});

app
  .route("/books")
  .get((req, res) => {
    res.send("get books");
  })
  .post((req, res) => {
    res.send("post books");
  })
  .put((req, res) => {
    res.send("put books");
  })
  .delete((req, res) => {
    res.send("delete books");
  });

app.listen(port, () => {
  console.log(`Server ${port} is runing...`);
});

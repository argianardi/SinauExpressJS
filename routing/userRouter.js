const express = require("express");
const app = express();
const router = express.Router();

router
  .route("/users")
  .get((req, res) => {
    res.send("get users");
  })
  .post((req, res) => {
    res.send("post users");
  });

router
  .route("/user/:userId")
  .put((req, res) => {
    res.send("put user");
  })
  .delete((req, res) => {
    res.send("delete user");
  });

module.exports = router;

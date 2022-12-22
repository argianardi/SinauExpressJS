const express = require("express");
const app = express();

// Error handling1---------------------------------

const errorHandler = (error, req, res, next) => {
  res.status(212).send(error.message);
};

// Error handling2---------------------------------
const errorHandler2 = (error, req, res, next) => {
  res.status(210).send(error.message);
};

// request function1 --------------------------------
app.get("/", (req, res) => {
  throw new Error("It is error");
});
// call error handling 1----------------------------
app.use(errorHandler);

// request function2 --------------------------------
app.get("/error", (req, res, next) => {
  FileSystem.readFile("/file-does-not-exist", (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});
// call error handling 2----------------------------
app.use(errorHandler2);

app.listen(4001, () => {
  console.log("Server 4001 is running...");
});

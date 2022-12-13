const express = require("express");
const app = express();

app.listen(3001, function () {
  console.log("server 3001 oke");
});

app.get("/", function (request, response) {
  response.send("Hello World!");
});

app.get("/users/:userId/books/:bookId", (request, response) => {
  response.send(request.params);
});

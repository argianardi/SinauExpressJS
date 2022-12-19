express = require("express");
const app = express();

const port = 3003;

// ------------------ middleware function ------------------
const requestTime = function (req, res, next) {
  req.requestTime = new Date();
  next();
};

// ------------------ Call middleware function ------------------
app.use(requestTime);

app.get("/", function (req, res) {
  let responseText = "Hello world <br>";
  responseText += `<small>Request at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(port, () => {
  console.log(`Server ${port} is okay`);
});

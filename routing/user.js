const express = require("express");
const app = express();
const userRouter = require("./userRouter");
const port = 5001;

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server ${port} is runing...`);
});

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();

const getUser = () => undefined;

app.get("/test", async (req, res, next) => {
  try {
    const user = getUser();

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    return next(error);
  }
  return res.status(200).json({ succes: true });
});

app.use(errorHandler);

app.listen(4000, () => {
  console.log(`Server 4000 is runing...`);
});

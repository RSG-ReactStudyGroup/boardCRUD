const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});

const userRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const likeRouter = require("./routes/likes");

app.use("/users", userRouter);
app.use("/board", boardRouter);
app.use("/likes", likeRouter);

const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require("./routes/posts");

app.use(cors());
app.use(express.json());
app.use("/posts", postsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

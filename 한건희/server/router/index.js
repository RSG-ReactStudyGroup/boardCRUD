import express from "express";
import boardApi from "./boards/index.js";

const routers = express.Router();

routers.use("/api/v1", boardApi);
routers.get("/ping", (res, req) => {
  res.send("보내짐 ");
});
export default routers;

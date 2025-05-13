import express from "express";
import boardApi from "./boards/index.js";

const routers = express.Router();

routers.use("/api/v1", boardApi);

export default routers;

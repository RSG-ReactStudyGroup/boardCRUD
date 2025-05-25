import express, { Router } from "express";
import boardApi from "./boards/index.js";
import {
  mainPage,
  writeForm,
  boardDetailForm,
} from "./boards/boards.controller.js";

const routers = express.Router();
routers.get("/", mainPage);
routers.get("/write", writeForm);
routers.get("/posts/:id", boardDetailForm);
routers.use("/api/v1", boardApi);

export default routers;

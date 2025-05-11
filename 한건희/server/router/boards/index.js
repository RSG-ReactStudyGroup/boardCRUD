import express from "express";
import * as boardController from "./boards.controller.js";
import { boardValidation, validator } from "../../middleware/validateBoard.js";

const router = express.Router();

router.post("/posts", boardValidation, validator, boardController.postBoards);

const boardApi = router;
export default boardApi;

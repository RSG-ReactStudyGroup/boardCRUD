import express from "express";
import * as boardController from "./boards.controller.js";
import { boardValidation, validator } from "../../middleware/validateBoard.js";
import { validateBoardId } from "../../middleware/validateBoardId.js";

const router = express.Router();

router.post("/posts", boardValidation, validator, boardController.postBoards);
router.get("/posts", boardController.getAllBoards);
router.get(
  "/posts/:id",
  validateBoardId,
  validator,
  boardController.getBoardById
);

const boardApi = router;
export default boardApi;

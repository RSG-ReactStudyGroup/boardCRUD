import express from "express";
import * as boardController from "./boards.controller.js";
import {
  createBoardMiddleware,
  getBoardIdMiddleware,
  updateBoardMiddleware,
  delteBoardMiddleware,
} from "../../middleware/boardMiddleware.js";

const router = express.Router();

router.post("/posts", createBoardMiddleware, boardController.postBoards);
router.get("/posts", boardController.getAllBoards);
router.get("/posts/:id", getBoardIdMiddleware, boardController.getBoardById);
router.put("/posts/:id", updateBoardMiddleware, boardController.updateBoards);
router.delete("/posts/:id", delteBoardMiddleware, boardController.deleteBoards);

const boardApi = router;
export default boardApi;

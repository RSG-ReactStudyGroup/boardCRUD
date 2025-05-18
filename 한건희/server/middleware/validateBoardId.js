import Boards from "../models/board.js";

export const validateBoardId = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await Boards.findByPk(boardId);

    if (!board) {
      const error = new Error("해당 게시물은 존재하지 않습니다 !");
      error.status = 404;
      throw error;
    }

    req.board = board;
    next();
  } catch (err) {
    next(err);
  }
};

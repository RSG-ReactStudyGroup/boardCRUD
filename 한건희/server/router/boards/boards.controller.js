import { createBoard } from "./service/createBoards.js";
import { getBoards } from "./service/getBoards.js";

// 게시글 등록
export const postBoards = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const newBoard = await createBoard({ title, content });
    res.status(201).json({ message: "등록완료 !", board: newBoard });
  } catch (err) {
    console.error("❌ postBoards 에러", err);
    next(err);
  }
};

// 전체 조회
export const getAllBoards = async (req, res, next) => {
  try {
    const boards = await getBoards();
    res.status(200).json({ message: "전체 개시물 조회 완료 !", boards });
  } catch (err) {
    console.log("❌ getAllBoardsController 에러", err);
    next(err);
  }
};

// 개별 조회
export const getBoardById = (req, res) => {
  res.status(200).json({
    message: "게시글 조회 성공",
    board: req.board,
  });
};

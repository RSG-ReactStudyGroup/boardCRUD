import { createBoard } from "./service/createBoards.js";
import { getBoards } from "./service/getBoards.js";
import { updateBoard } from "./service/updateBoard.js";
import { deleteBoard } from "./service/deleteBoard.js";
import dayjs from "dayjs";

// 게시글 등록 API
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

// 전체 조회 API
export const getAllBoards = async (req, res, next) => {
  try {
    const boards = await getBoards();

    const parsedBoards = boards.map((board) => ({
      ...board.dataValues,
      date: dayjs(board.updated_at || board.created_at).format("YYYY-MM-DD"),
    }));
    res.status(200).json({ message: "전체 개시물 조회 완료 !", parsedBoards });
    // res.render("index", { boards: parsedBoards });
    return;
  } catch (err) {
    console.log("❌ getAllBoardsController 에러", err);
    next(err);
  }
};

// 개별 조회 API
export const getBoardById = (req, res) => {
  res.status(200).json({
    message: "게시글 조회 성공",
    board: req.board,
  });
};

// 업데이트 API
export const updateBoards = async (req, res, next) => {
  try {
    const updated = await updateBoard(req.board, req.body);

    res.status(200).json({
      message: "게시글 수정 완료",
      updated: updated,
    });
  } catch (err) {
    next(err);
  }
};

//삭제 API
export const deleteBoards = async (req, res, next) => {
  try {
    await deleteBoard(req.board);
    res.status(200).json({ message: "게시글 삭제 완료. " });
  } catch (err) {
    next(err);
  }
};

// 메인 화면
export const mainPage = (req, res) => {
  res.render("index");
};

// 게시글 작성
export const writeForm = (req, res) => {
  res.render("write");
};

// 게시물 상세보기
export const boardDetailForm = (req, res) => {
  res.render("detail");
};

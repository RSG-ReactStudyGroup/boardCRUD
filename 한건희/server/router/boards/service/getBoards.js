import Boards from "../../../models/board.js";

export const getBoards = async () => {
  try {
    const boards = await Boards.findAll({ order: [["id", "DESC"]] }); //최신순 정령
    return boards;
  } catch (err) {
    throw new Error("게시물 전체 조회 실패");
  }
};

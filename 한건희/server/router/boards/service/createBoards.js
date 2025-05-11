import Boards from "../../../models/board.js";

export const createBoard = async ({ title, content }) => {
  try {
    const newBoard = await Boards.create({ title, content });

    return {
      id: newBoard.id,
      title: newBoard.title,
      content: newBoard.content,
    };
  } catch (err) {
    throw new Error("게시글 생성 중 오류 발생");
  }
};

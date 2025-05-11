import { createBoard } from "./service/createBoards.js";

export const postBoards = async (req, res, next) => {
  console.log(req.body);
  try {
    const { title, content } = req.body;
    const newBoard = await createBoard({ title, content });
    res.status(201).json({ message: "등록완료 !", board: newBoard });
  } catch (err) {
    console.error("❌ postBoards 에러:", err);
    next(err);
  }
};

import { boardValidation, validator } from "./validateBoard.js";
import { validateBoardId } from "./validateBoardId.js";

export const createBoardMiddleware = [boardValidation, validator];
export const getBoardIdMiddleware = [validateBoardId];
export const updateBoardMiddleware = [
  validateBoardId,
  boardValidation,
  validator,
]; // id가 먼저 있는지 확인 -> 벨리데이션 체크
export const delteBoardMiddleware = [validateBoardId];

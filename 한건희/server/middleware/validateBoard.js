import { body, validationResult } from "express-validator";

export const boardValidation = [
  body("title").notEmpty().withMessage("제목을 꼭 입력해주세요"),
];

export const validator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    const error = new Error("입력갑 오류");
    error.status = 400; //커스텀 status 추가
    error.details = errors.array(); //에러 상세 메시지
    throw error; // 던지면 아래로 전파됨
  }
  next();
};

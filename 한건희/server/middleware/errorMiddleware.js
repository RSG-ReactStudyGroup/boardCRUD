export const errorMiddleware = (err, req, res, next) => {
  console.log("에러발생 ", err.stack || err.message);

  const status = err.status || 500;
  const message = err.message || "서버 내부 오류 발생";

  res.status(status).json({
    message, //입력값 오류
    errors: err.details || null, // expresss - validator의 상세 메세지 배열
  });
};

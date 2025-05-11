import express from "express";
import { sequelize } from "./config/mariaDB.js";
import routers from "./router/index.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
const port = 3000;

app.use(express.json()); //json으로 파싱
app.use("/", routers); //라우터 등록
app.use(errorMiddleware); //공통핸들러 맨 마지막에 작성

//Sequelize DB 동기화
sequelize
  .sync({ force: false }) //true면 테이블 초기화
  .then(() => {
    console.log("sequlize : DB 연결 완료");
    app.listen(port, () => {
      console.log(`${port}번으로 서버 실행`);
    });
  })
  .catch((err) => {
    console.log("sequlize : DB 연결 실패");
  });

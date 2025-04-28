const express = require("express");
const app = express();
const port = '1009' // 포트 번호 생성 

const mariadb = require('./database/connet/mariadb');
//db 연결 확인 함수
mariadb.connect((err) => {
    if(err) {
        console.log(`DB연결 실패: ${err}`);
        return;
    }
    console.log('DB 연결 성공');
})


app.listen(port, () => {
    console.log(`${port}로 실행시킴!`);
});
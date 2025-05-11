
import mysql from 'mysql2/promise';

// Create the connection to database
const connDB = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'noticeBoard',
  timezone : 'local', //Node.js 서버가 실행 중인 시스템의 로컬 시간대를 기준으로, MariaDB의 DATETIME, TIMESTAMP 등의 시간 데이터를 해석하고 변환하겠다는 뜻
  dateStrings: true //  원래는 날것에서 "DATE, DATETIME, TIMESTAMP 타입을 문자열로 받아오겠다"
});

export default connDB
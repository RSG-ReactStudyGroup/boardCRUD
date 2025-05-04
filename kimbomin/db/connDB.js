
import mysql from 'mysql2/promise';

// Create the connection to database
const connDB = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : 'root',
  database: 'noticeBoard',
  // timezone : 'local',
  dateStrings: true //  원래는 날것에서 "DATE, DATETIME, TIMESTAMP 타입을 문자열로 받아오겠다"
});

export default connDB
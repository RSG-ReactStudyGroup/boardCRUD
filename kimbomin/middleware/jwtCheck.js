import jwt from 'jsonwebtoken'
import connDB from '../db/connDB.js'
import dotenv from 'dotenv'
dotenv.config()

// 1) 요청에 access_token 있는지 확인
// 2) 있으면 복호화
// 3) 복호화한거에서 email, nickname <=> 회원DB에 email, nickname 같은거 조회해서 있으면 rows => 로그인 유지
// 4) req.user = rows[0] 이렇게 => 사용자 정보를 담는다
// 5) 다른 API에서 화면 접속시(HTTP요청시) 로그인 유지 시킬 수 있다.
export default async function jwtCheck(req, res, next){
  try{
    // 요청에 token 확인
    const token = req.cookies.acces_token;
    if(token) {
      // 복호화
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      // 복호화 객체 <=> DB 조회
      const [rows] = await connDB.query(
        `SELECT email, nickname FROM users WHERE email = ? AND nickname = ?`,
        [decoded.email, decoded.nickname]
      )
      // 맞는 회원정보가 있으면 => 회원 정보 담아줌
      if(rows.length === 1) {
        req.user = rows[0] // email, nickname 담겨있음
      }
    }
    next()
  }
  catch(err) {
    console.error("error : ",err)
    return res.status(400).json({
      message : "jwt 체크 실패"
    })
  }
}
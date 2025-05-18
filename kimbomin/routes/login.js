import express from 'express'
const router = express.Router()
import connDB from '../db/connDB.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


// 로그인 페이지 접속
router.get('/', async (req, res) => {
  try {
    // res.render() : 위에서 설정을 토대로 (views파일에서) ejs 파일을 읽어다 html로 변환해서 클라이언트에 넘겨줌
    const name = "주인장"
    res.status(200).render('login', 
      {
        name : name
      }
    )
  }
  catch(err) {
    console.error("err : ", err)
    res.status(400).end()
  }
})


// 로그인 응답
router.post('/', async (req, res) => {
  try {
    const {email, password} = req.body
    console.log("email : ",email)
    console.log("password : ",password)
    const [result, _] = await connDB.query(
      `SELECT email, nickname FROM users WHERE email = ? AND password = ?`,
      [email, password]
    )
    console.log("result : ", result)
    // 로그인  실패
    if(result.length === 0){
      return res.status(400).json({
        loginFlag : 'N',
        message: "로그인 실패"
      })
    }
    
    // 로그인 성공
    // jwt 발급
    const token = jwt.sign(
      {email: email, nickname : result[0].nickname},
      process.env.SECRET_KEY,
      {expiresIn: '1h'}
    )
    res.cookie('acces_token', token, {
      httpOnly: true,
      secure: false,
      sameStie: 'strict',
      maxAge: 1000 * 60 * 60 // 1시간
    })
    return res.status(200).json({
      loginFlag : 'Y',
      message: "로그인 성공"
    })
  }
  catch(err) {
    console.error("err : ", err)
    res.status(400).end()
  }
})

export default router
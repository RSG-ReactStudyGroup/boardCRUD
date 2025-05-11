// 필요 모듈 소환
import express from 'express'
const router = express.Router()
import connDB from '../db/connDB.js'


// 회원가입
router.post('/', 
  async (req, res) => {
    console.log(req.body)
    try {
      const {email, password, nickname} = req.body
      const [dbResult, _] = await connDB.query(
        `INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)`,
        [email, password, nickname]
      )
      console.log("dbResult : ",dbResult)
      res.status(201).json({
        message : "회원가입 성공",
        result : dbResult
      })
    }
    catch (err) {
      console.error("에러남",err)
      res.status(500).json({message : "/users POST 에러남"})
    }
  }
)


// 전체 회원 조회
router.get('/',
  async (req, res) => {
    try {
      const [dbResult, _] = await connDB.query(
        `SELECT * FROM users`
      )
      console.log("dbResult : ",dbResult)
      res.status(201).json({
        message : "전체 회원 조회 성공",
        result : dbResult
      })
    }
    catch (err) {
      console.error("에러남",err)
      res.status(500).json({message : "서버에서 에러남"})
    }
  }
)

// 개별 회원 조회
router.get('/:id', 
  async (req, res) => {
    try {
      const {id} = req.params
      const [dbResult, _] = await connDB.query(
        `SELECT * FROM users WHERE id = ?`,
        id
      )
      console.log("dbResult : ",dbResult)
      res.status(201).json({
        message : "개별 회원 조회 성공",
        result : dbResult
      })
    }
    catch (err) {
      console.error("에러남",err)
      res.status(500).json({message : "서버에서 에러남"})
    }
  }
)


export default router
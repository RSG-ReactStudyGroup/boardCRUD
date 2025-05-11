// 필요 모듈 소환
import express from 'express'
const router = express.Router()
import connDB from '../db/connDB.js'


// 게시글 생성
router.post('/', 
  async (req, res) => {
    try {
      const {user_id, title, contents} = req.body
      const [dbResult, _] = await connDB.query(
        `INSERT INTO posts (user_id, title, contents) VALUES (?,?,?)`,
        [user_id, title, contents]
      )
      console.log("dbResult : ",dbResult)
      res.status(201).json({
        message : "게시글 작성 성공",
        result : dbResult
      })
    }
    catch (err) {
      console.error("에러남",err)
      res.status(500).json({message : "서버에서 에러남"})
    }
  }
)


// 전체 게시글 조회
router.get('/',
  async (req, res) => {
    try {
      const [dbResult, _] = await connDB.query(
        `SELECT * FROM posts`
      )
      console.log("dbResult : ",dbResult)
      res.status(201).json({
        message : "전체 게시글 조회 성공",
        result : dbResult
      })
    }
    catch (err) {
      console.error("에러남",err)
      res.status(500).json({message : "서버에서 에러남"})
    }
  }
)

// 개별 게시글 조회
router.get('/:id', 
  async (req, res) => {
    try {
      const {id} = req.params
      const [dbResult, _] = await connDB.query(
        `SELECT * FROM posts WHERE id = ?`,
        id
      )
      console.log("dbResult : ",dbResult)
      res.status(201).json({
        message : "개별 게시글 조회 성공",
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
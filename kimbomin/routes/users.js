// 필요 모듈 소환
import express from 'express'
const router = express.Router()


// 회원갑입
router.post('/', 
  (req, res) => {
    res.json({message : "GET /users 응답 입니다."})
  }
)


// 전체 회원 조회
router.get('/',
  (req, res) => {
    res.json({message : "GET /users 응답 입니다."})
  }
)


router.get('/', 
  (req, res) => {
    res.json({message : "GET /users 응답 입니다."})
  }
)

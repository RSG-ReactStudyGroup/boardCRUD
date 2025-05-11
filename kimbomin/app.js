
// 필요 모듈 불러오기
import dotenv from 'dotenv'
dotenv.config() // 모듈로 .env파일 파싱
const PORT = process.env.PORT
import express from 'express'
const app = express()

// 미들웨어 함수 등록
app.use(express.json()) // 요청으로 들어오는 json형태 데이터를 -> nodeJS에서 읽을 수 있게 파싱 해줌 => 파싱전까진 req.body가 undefined로 뜰거임

import usersRouter from './routes/users.js'
app.use('/users', usersRouter)

import postsRouter from './routes/posts.js'
app.use('/posts', postsRouter)


app.listen(PORT, () => {
  console.log(`${PORT} 해당 포트넘버로 서버 가동 중`)
})
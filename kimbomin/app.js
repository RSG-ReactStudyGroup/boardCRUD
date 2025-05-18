
// 필요 모듈 불러오기
import dotenv from 'dotenv'
dotenv.config() // 모듈로 .env파일 파싱
const PORT = process.env.PORT
import express from 'express'
const app = express()


// nodeJS,express환경에서 ejs 사용 위해선 -> npm i ejs
// __dirname 설정 (ESM 환경일 경우 필요)
import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// EJS 뷰 엔진 설정
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // 뷰 파일 경로


// 미들웨어 함수 등록
app.use(express.json()) // 요청으로 들어오는 json형태 데이터를 -> nodeJS에서 읽을 수 있게 파싱 해줌 => 파싱전까진 req.body가 undefined로 뜰거임
import cookieParser from 'cookie-parser'
app.use(cookieParser()) // 모든 요청에서 req.cookies 사용 가능
import jwtCheck from './middleware/jwtCheck.js'
app.use(jwtCheck) // 경로 없이 전체 요청에 대해 일괄 적용


// 라우터 연결
import indexRouter from './routes/index.js'
app.use('/', indexRouter)

import usersRouter from './routes/users.js'
app.use('/users', usersRouter)

import loginRouter from './routes/login.js'
app.use('/login', loginRouter)

import postsRouter from './routes/posts.js'
app.use('/posts', postsRouter)


app.listen(PORT, () => {
  console.log(`${PORT} 해당 포트넘버로 서버 가동 중`)
})
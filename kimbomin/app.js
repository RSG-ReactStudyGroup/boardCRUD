
// 필요 모듈 불러오기
const PORT = 1234
import express from 'express'
const app = express()


import usersRouter from './routes/users'
app.use('/users', usersRouter)

import postsRouter from './routes/posts'
app.use('/posts', usersRouter)


app.listen(PORT, () => {
  console.log(`${PORT} 해당 포트넘버로 서버 가동 중`)
})
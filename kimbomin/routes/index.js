
import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
  // res.render() : 위에서 설정을 토대로 (views파일에서) ejs 파일을 읽어다 html로 변환해서 클라이언트에 넘겨줌
  const name = "주인장"
  res.status(200).render('index', 
    {
      name : name
    }
  )
})

export default router
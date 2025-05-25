
import express from 'express'
const router = express.Router()


router.get('/', async (req, res) => {
  try {
    console.log("홈에서 req.user 확인 : ", req.user)
    
    console.log("req.user : ",req.user)
    const {nickname} = req.user

    // res.render() 기능 : 위에서 설정을 토대로 (views파일에서) ejs 파일을 읽어다 html로 변환해서 클라이언트에 넘겨줌
    return res.status(200).render('index', {
      name : nickname,
    })
  }
  catch(err) {
    console.log("error : ", err)
    return res.status(400).json({
      message : "홈 GET 요청 응답 실패"
    })
  }
})

export default router
var express = require('express');
var router = express.Router();
const { registerValidation } = require('../middlewares/validators');
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 회원가입 라우트
router.post('/register', registerValidation, userController.registerUser);

// 로그인 라우트
router.post('/login', userController.loginUser);

module.exports = router;

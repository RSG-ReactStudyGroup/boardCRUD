const { body } = require('express-validator');

// 회원가입 유효성 검사 미들웨어
const registerValidation = [
    body('email').isEmail().withMessage('유효한 이메일을 입력하세요.'),
    body('username').isLength({ min: 3 }).withMessage('사용자명은 최소 3자 이상이어야 합니다.'),
    body('password').isLength({ min: 6 }).withMessage('비밀번호는 최소 6자 이상이어야 합니다.')
];

module.exports = {
    registerValidation,
};

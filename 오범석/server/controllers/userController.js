const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// 회원가입
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, username, password, passwordConfirm } = req.body;

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== passwordConfirm) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: [{ msg: '비밀번호가 일치하지 않습니다.' }] });
    }

    try {
        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        res.status(StatusCodes.CREATED).json({ message: '회원가입이 완료 되었습니다.', userId: user.id });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 사용자 조회
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(StatusCodes.OK).json({ message: '로그인에 성공하였습니다.', token });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
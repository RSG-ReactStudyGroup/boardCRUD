const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

const getPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    // /posts?page=1&limit=10
    // page=?&limit=10개

    // Prisma 문법 limit 값을 findMany() 메서드의 take 속성으로 사용
    const take = parseInt(limit);

    // Prisma 문법 DB에서 가져올 데이터의 시작 위치를 skip 속성으로 사용
    const skip = (page - 1) * take;
    // const sql = `${SQL.allGetPosts} LIMIT ? OFFSET ?`;
    
    try {
        // const [posts] = await pool.query(sql, params);
        const posts = await prisma.post.findMany({
            orderBy: { created_at: 'desc' },
            skip,
            take,
            // Post 모델과 User 모델을 조인하여 게시글과 작성자 정보를 함께 가져옴
            include: {
                user: {
                    // User 모델에서 필요한 필드만 선택
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });

        res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getPosts,
};
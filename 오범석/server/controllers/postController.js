const { PrismaClient } = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');

const prisma = new PrismaClient();

// 게시글 목록 조회
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
        // findMany 여러개의 레코드를 조회하는 Prisma 메서드 (SELECT * FROM posts)
        const posts = await prisma.post.findMany({
            orderBy: { created_at: 'desc' },
            skip,
            take,
            // include 옵션으로 Post 모델과 User 모델을 조인하여 게시글과 작성자 정보를 함께 가져옴
            include: {
                user: {
                    // User 모델에서 필요한 필드만 선택
                    select: {
                        username: true,
                    },
                },
            },
        });

        res.status(StatusCodes.OK).json(posts);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
};

// 게시글 조회
const getPost = async (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        // findUnique 고유한 하나의 게시글을 조회하는 Prisma 메서드
        const post = await prisma.post.findUnique({
            // where 조건으로 게시글 ID를 지정
            where: { id: postId },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        if (!post) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: '페이지를 찾을 수 없습니다.' });
        }

        res.status(StatusCodes.OK).json(post);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
}

// 게시물 등록
const createPost = async (req, res) => {
    const { title, content, userId } = req.body;

    // console.log(req.body);
    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                userId
            }
        });
        // console.log(newPost);
        res.status(StatusCodes.CREATED).json(newPost);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
}

// 게시글 수정
const updatePost = async (req, res) => {
    postId = parseInt(req.params.id);
    const { title, content } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { title, content }
        });
        res.status(StatusCodes.OK).json(updatedPost);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
}

// 게시글 삭제
const deletePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        await prisma.post.delete({
            where: { id: postId }
        });
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '잘못된 요청' });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};
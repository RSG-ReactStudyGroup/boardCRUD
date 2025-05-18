const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .get(postController.getPosts)        // 게시글 목록 조회
  .post(postController.createPost)     // 게시글 등록

router
  .route("/:id")
  .get(postController.getPost)         // 게시글 상세 조회
  .put(postController.updatePost)     // 게시글 수정
  .delete(postController.deletePost); // 게시글 삭제

module.exports = router;
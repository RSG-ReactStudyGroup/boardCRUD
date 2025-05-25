const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.json("전체 계시판");
});

router.get("/:id", (req, res) => {
  res.json("개별 게시판 조회");
});

module.exports = router;

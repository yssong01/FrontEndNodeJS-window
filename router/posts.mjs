// router/posts.mjs

import express from "express";
// 포스트 비즈니스 로직이 있는 컨트롤러
import * as postController from "../controller/post.mjs";
// 요청 body 검증을 위한 express-validator
import { body } from "express-validator";
// 검증 결과를 처리하는 공통 미들웨어
import { validate } from "../middleware/validator.mjs";
// JWT 검증 미들웨어
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

// 글 내용(text) 최소 길이 검증 체인
const validatePost = [
  body("text").trim().isLength({ min: 4 }).withMessage("최소 4자이상 입력"),
  validate, // 위에서 정의한 validate 미들웨어 실행
];

// 전체 포스트 가져오기
// GET /post   또는   GET /post?userid=XXX
router.get("/", isAuth, postController.getPosts);

// 글번호(id)로 포스트 한 개 가져오기
// GET /post/:id
router.get("/:id", isAuth, postController.getPost);

// 포스트 작성
// POST /post
router.post("/", isAuth, validatePost, postController.createPost);

// 포스트 수정
// PUT /post/:id
router.put("/:id", isAuth, validatePost, postController.updatePost);

// 포스트 삭제
// DELETE /post/:id
router.delete("/:id", isAuth, postController.deletePost);

export default router;

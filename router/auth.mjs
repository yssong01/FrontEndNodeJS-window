// router/auth.mjs

import express from "express";
// 회원가입/로그인/로그인유지 로직이 있는 컨트롤러
import * as authController from "../controller/auth.mjs";
// 입력값 검증용
import { body } from "express-validator";
// 검증 결과 처리 미들웨어
import { validate } from "../middleware/validator.mjs";
// JWT 인증 미들웨어 (me 엔드포인트에서 사용)
import { isAuth } from "../middleware/auth.mjs";

const router = express.Router();

// 로그인 시 아이디/비밀번호 검증 체인
const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자이상 입력")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("특수문자 사용불가"),
  body("password").trim().isLength({ min: 4 }).withMessage("최소 4자이상 입력"),
  validate,
];

// 회원가입 시 추가 검증 (이메일/이름)
const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원 가입
// POST /auth/signup
router.post("/signup", validateSignup, authController.signup);

// 로그인
// POST /auth/login
router.post("/login", validateLogin, authController.login);

// 로그인 유지(me) – JWT 토큰으로 사용자 정보 확인
// POST /auth/me
router.post("/me", isAuth, authController.me);

export default router;
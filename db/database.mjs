// controller/auth.mjs
// 회원 가입 / 로그인 / 로그인 유지 컨트롤러
// - 비밀번호 해시(bcrypt)
// - JWT 생성(jsonwebtoken)
// - 프로필 URL: 보내면 그대로 사용, 안 보내면 랜덤 생성

import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config.mjs";

// JWT 토큰 생성 함수
function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

// 랜덤 프로필 URL 생성 (randomuser.me 사용)
function createRandomProfileURL() {
  const id = Math.floor(Math.random() * 100); // 0 ~ 99
  return `https://randomuser.me/api/portraits/women/${id}.jpg`;
}

// ------------------------------
// 회원가입
// ------------------------------
export async function signup(req, res, next) {
  // 프론트에서는 userid / password / name / email (＋ 선택적으로 url)만 보낸다.
  const { userid, password, name, email, url } = req.body;

  // 1) 아이디 중복 체크
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res
      .status(409)
      .json({ message: `${userid} 아이디는 이미 사용 중입니다.` });
  }

  // 2) 비밀번호 해시(암호화)
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

  // 3) 프로필 URL 결정
  //    - url을 보냈으면 그 값 사용
  //    - 안 보냈으면 랜덤 URL 생성
  const profileUrl = url ?? createRandomProfileURL();

  // 4) DB에 새 사용자 저장
  //    createUser는 저장된 user 객체(＋id 필드)를 돌려준다.
  const user = await authRepository.createUser({
    userid,
    password: hashed,
    name,
    email,
    url: profileUrl,
  });

  // 5) JWT 토큰 생성 (payload에 user.id를 담는다)
  const token = createJwtToken(user.id);

  // 6) 클라이언트로 토큰 + 사용자 정보 응답
  return res.status(201).json({ token, user });
}

// ------------------------------
// 로그인
// ------------------------------
export async function login(req, res, next) {
  const { userid, password } = req.body;

  // 1) 아이디로 사용자 조회
  const user = await authRepository.findByUserid(userid);
  if (!user) {
    return res.status(401).json({ message: `${userid} 를 찾을 수 없습니다.` });
  }

  // 2) 비밀번호 검증
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: "아이디 또는 비밀번호를 확인하세요." });
  }

  // 3) JWT 토큰 발급
  const token = createJwtToken(user.id);

  // 4) 토큰 + 사용자 정보 응답 (url 포함)
  return res.status(200).json({ token, user });
}

// ------------------------------
// 로그인 유지(me)
// ------------------------------
export async function me(req, res, next) {
  // auth 미들웨어에서 req.id, req.token을 채워준다.
  const user = await authRepository.findById(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없습니다." });
  }

  // 토큰과 함께 userid, name, url 등을 내려준다.
  return res.status(200).json({
    token: req.token,
    userid: user.userid,
    name: user.name,
    email: user.email,
    url: user.url,
  });
}
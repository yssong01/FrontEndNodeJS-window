import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
import { config } from "../config.mjs";

const AUTH_ERROR = { message: "인증 에러" };

// 라우터에서 isAuth를 끼워 넣으면,
// 1) Authorization 헤더의 JWT를 꺼내서
// 2) 검증하고
// 3) 사용자 정보를 찾아 req.id에 넣은 뒤
// 4) next()로 다음 미들웨어/컨트롤러로 넘어감
export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log("Authorization:", authHeader);

  // 'Bearer <token>' 형식이 아니면 401
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log("헤더 에러");
    return res.status(401).json(AUTH_ERROR);
  }

  // 'Bearer ' 뒤의 토큰만 추출
  const token = authHeader.split(" ")[1];

  // 토큰 검증
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      console.log("토큰 에러");
      return res.status(401).json(AUTH_ERROR);
    }

    console.log("decoded:", decoded);

    // 토큰 안의 id로 사용자 조회
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      console.log("아이디 없음");
      return res.status(401).json(AUTH_ERROR);
    }

    // 이후 컨트롤러에서 사용할 수 있게 req에 기록
    req.id = user.id;      // MongoDB id 문자열
    req.token = token;     // (선택) 토큰도 저장
    next();
  });
};
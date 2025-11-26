// middleware/validator.mjs

// express-validator에서 검증 결과를 꺼내기 위한 함수
import { validationResult } from "express-validator";

/**
 * 라우터에서 body(...) 같은 검증 체인을 실행한 뒤
 * 이 미들웨어를 통과시키면,
 * 에러가 있을 때는 400 응답을, 없으면 next()로 넘어갑니다.
 */
export function validate(req, res, next) {
  const errors = validationResult(req);

  // 에러가 하나도 없으면 다음 미들웨어/컨트롤러로
  if (errors.isEmpty()) {
    return next();
  }

  // 에러가 있으면 첫 번째 메시지를 클라이언트에게 보냄
  return res.status(400).json({
    message: errors.array()[0].msg,
  });
}

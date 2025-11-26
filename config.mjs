// config.mjs
import dotenv from "dotenv";
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    // [FIX] 백틱(`) 사용해서 템플릿 문자열로 변경
    throw new Error(`키 ${key}는 undefined!!`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC"), 10),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12), 10),
  },
  host: {
    // ✅ Render 환경: PORT 우선 사용
    //    로컬/기타 환경: HOST_PORT → 없으면 9090 사용
    port: parseInt(
      process.env.PORT || process.env.HOST_PORT || "9090",
      10
    ),
  },
  db: {
    host: required("DB_HOST"),
  },
};

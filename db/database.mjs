// db/database.mjs

// .env에서 DB_HOST 등을 읽기 위해 config import
import { config } from "../config.mjs";
// 공식 MongoDB Node.js 드라이버
import MongoDB from "mongodb";

// 여기 변수에 실제 DB 연결 객체를 보관
let db;

/**
 * MongoDB Atlas에 연결하는 함수
 * - app.mjs에서 서버 시작 전에 한 번만 호출
 * - 연결이 성공하면 db = client.db("aidetect") 로 세팅
 */
export async function connectDB() {
  // config.db.host  == .env의 DB_HOST
  return MongoDB.MongoClient.connect(config.db.host).then((client) => {
    // 사용할 데이터베이스 이름: aidetect
    db = client.db("aidetect");
    console.log("MongoDB 연결 성공 (DB: aidetect)");
  });
}

/**
 * users 컬렉션 핸들러
 * - data/auth.mjs 에서 사용
 */
export function getUsers() {
  return db.collection("users");
}

/**
 * posts 컬렉션 핸들러
 * - data/post.mjs 에서 사용
 */
export function getPosts() {
  return db.collection("posts");
}

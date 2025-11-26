// db/database.mjs

import { config } from "../config.mjs";
import MongoDB from "mongodb";

let db;

/**
 * MongoDB Atlas에 연결하는 함수
 * - 서버 시작 전에 한 번만 호출
 */
export async function connectDB() {
  if (db) {
    // 이미 연결되어 있으면 재사용
    return db;
  }

  const client = await MongoDB.MongoClient.connect(config.db.host, {
    // 최신 드라이버 옵션 (필요 시)
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  db = client.db("aidetect");
  console.log("MongoDB 연결 성공 (DB: aidetect)");

  return db;
}

/** users 컬렉션 핸들러 */
export function getUsers() {
  if (!db) {
    throw new Error("DB 연결 전입니다. connectDB()가 먼저 호출되어야 합니다.");
  }
  return db.collection("users");
}

/** posts 컬렉션 핸들러 */
export function getPosts() {
  if (!db) {
    throw new Error("DB 연결 전입니다. connectDB()가 먼저 호출되어야 합니다.");
  }
  return db.collection("posts");
}

// db/database.mjs
// MongoDB Atlas와 연결하고, 각 컬렉션(users, posts)을 돌려주는 모듈

import { MongoClient } from "mongodb";
import { config } from "../config.mjs";

let client; // MongoClient 인스턴스
let db; // 현재 DB 객체

// ------------------------------
// 1) MongoDB 연결
// ------------------------------
export async function connectDB() {
  // 이미 연결되어 있으면 재사용
  if (client && db) {
    return client;
  }

  // config.db.host  = "mongodb+srv://.../aidetect?..."
  client = new MongoClient(config.db.host);

  await client.connect();
  db = client.db(); // connection string에 지정된 기본 DB 사용

  console.log("✅ MongoDB 연결 성공 (DB:", db.databaseName, ")");
  return client;
}

// ------------------------------
// 2) users 컬렉션 핸들러
// ------------------------------
export function getUsers() {
  if (!db) {
    throw new Error(
      "MongoDB가 아직 연결되지 않았습니다. connectDB()를 먼저 호출하세요."
    );
  }
  return db.collection("users");
}

// ------------------------------
// 3) posts 컬렉션 핸들러
// ------------------------------
export function getPosts() {
  if (!db) {
    throw new Error(
      "MongoDB가 아직 연결되지 않았습니다. connectDB()를 먼저 호출하세요."
    );
  }
  return db.collection("posts");
}

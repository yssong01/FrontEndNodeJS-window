// data/auth.mjs
// MongoDB Atlas의 users 컬렉션과 통신하는 모듈
// - createUser: 사용자 생성
// - findByUserid: userid로 조회
// - findById: id(ObjectId)로 조회

import MongoDB from "mongodb";
import { getUsers } from "../db/database.mjs";

const ObjectID = MongoDB.ObjectId;

// 새 사용자 생성
// user 객체를 받아 users 컬렉션에 저장하고,
// 저장된 문서를 mapOptionalUser 형태(id 필드 포함)로 반환한다.
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => getUsers().findOne({ _id: result.insertedId }))
    .then(mapOptionalUser);
}

// userid(로그인 아이디)로 사용자 한 명 찾기
export async function findByUserid(userid) {
  return getUsers()
    .find({ userid })
    .next()
    .then(mapOptionalUser);
}

// 내부 _id(ObjectId 문자열)로 사용자 한 명 찾기
export async function findById(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

// MongoDB 문서를 일반 JS 객체 + id(문자열) 형태로 변환
function mapOptionalUser(user) {
  // user가 null/undefined면 그대로 반환
  if (!user) return user;
  // _id(ObjectId)를 문자열 id로 옮기고, 나머지 필드(userid, name, email, url, password 등)는 그대로 유지
  return { ...user, id: user._id.toString() };
}
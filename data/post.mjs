// data/post.mjs
// posts 컬렉션과 통신하는 모듈
// - 글 목록 / 상세 / 작성 / 수정 / 삭제
// - 글 작성 시 user 정보에서 name, userid, url을 함께 저장

import MongoDB from "mongodb";
import * as UserRepository from "./auth.mjs";
import { getPosts } from "../db/database.mjs";

const ObjectID = MongoDB.ObjectId;

// 모든 포스트를 최신순(createdAt 내림차순)으로 가져오기
export async function getAll() {
  return getPosts().find().sort({ createdAt: -1 }).toArray();
}

// 특정 userid가 작성한 포스트만 가져오기
export async function getAllByUserid(userid) {
  return getPosts().find({ userid }).sort({ createdAt: -1 }).toArray();
}

// 글 번호(id)로 포스트 한 개 가져오기
export async function getById(id) {
  return getPosts()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalPost);
}

// 새 포스트 작성
// text: 글 내용, id: 작성자 user.id
export async function create(text, id) {
  return UserRepository.findById(id)
    .then((user) =>
      getPosts().insertOne({
        text,
        createdAt: new Date(),
        idx: user.id,        // 작성자 id
        name: user.name,     // 작성자 이름
        userid: user.userid, // 작성자 아이디
        url: user.url,       // 작성자 프로필 URL (자동 생성된 값)
      })
    )
    .then((result) => {
      // 방금 생성한 문서를 다시 읽어서 반환
      return getPosts().findOne({ _id: result.insertedId });
    });
}

// 포스트 내용 수정
export async function update(id, text) {
  return getPosts()
    .findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: { text } },
      { returnDocument: "after" } // 수정 후 문서를 반환
    )
    .then((result) => result);
}

// 포스트 삭제
export async function remove(id) {
  return getPosts().deleteOne({ _id: new ObjectID(id) });
}

// MongoDB 문서에 id 문자열 필드를 추가하는 헬퍼
function mapOptionalPost(post) {
  return post ? { ...post, id: post._id.toString() } : post;
}
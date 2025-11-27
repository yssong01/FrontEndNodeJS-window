import * as postRepository from "../data/post.mjs";

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const userid = req.query.userid;
  const data = await (userid
    ? postRepository.getAllByUserid(userid)
    : postRepository.getAll());
  res.status(200).json(data);
}

// 하나의 포스트를 가져오는 함수
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }
}

// 포스트를 작성하는 함수
export async function createPost(req, res, next) {
  const { text } = req.body;
  const post = await postRepository.create(text, req.id);
  res.status(201).json(post);
}

// 포스트를 변경하는 함수
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.getById(id);

  // 1) 포스트 존재 여부 확인
  if (!post) {
    return res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }

  // 2) 수정 권한 체크
  if (post.idx !== req.id) {
    return res.status(403).json({ message: "수정 권한이 없습니다" });
  }

  // 3) 업데이트
  const updated = await postRepository.update(id, text);
  return res.status(200).json(updated);
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);

  // 1) 존재 여부 확인
  if (!post) {
    return res.status(404).json({ message: `${id}의 포스트가 없습니다` });
  }

  // 2) 권한 체크
  if (post.idx !== req.id) {
    return res.status(403).json({ message: "삭제 권한이 없습니다" });
  }

  // 3) 삭제
  await postRepository.remove(id);

  // 4) 성공 메시지 반환 (204 대신 200 JSON)
  return res.status(200).json({
    message: `${id} 게시글이 삭제되었습니다.`,
  });
}
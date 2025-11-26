// frontend/js/post_edit_page.js

import { getPost, updatePost } from "./api.js";

// URL에서 ?id=... 추출
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// DOM 요소
const form = document.getElementById("editPostForm");
const textarea = form.querySelector("textarea[name='text']");
const msgEl = document.getElementById("editMessage");

if (!id) {
  msgEl.textContent = "잘못된 접근입니다. (id 값이 없습니다)";
}

// 기존 글 내용 불러오기
async function loadPost() {
  msgEl.textContent = "";

  try {
    const post = await getPost(id); // GET /post/:id

    if (!post || !post.text) {
      msgEl.textContent = "글 데이터를 찾을 수 없습니다.";
      return;
    }

    // 여기에서 기존 글 내용을 textarea에 채워 넣는다
    textarea.value = post.text;
  } catch (err) {
    msgEl.textContent = "글 불러오기 실패: " + err.message;
  }
}

// 수정 폼 전송
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msgEl.textContent = "";

  const newText = textarea.value.trim();
  if (!newText) {
    msgEl.textContent = "내용을 입력하세요.";
    return;
  }

  try {
    await updatePost(id, newText); // PUT /post/:id
    msgEl.textContent = "수정 완료! 상세 페이지로 이동합니다.";
    setTimeout(() => {
      window.location.href = `./post_detail.html?id=${id}`;
    }, 800);
  } catch (err) {
    msgEl.textContent = "수정 실패: " + err.message;
  }
});

// 페이지 로딩 시 기존 글 먼저 채우기
loadPost();

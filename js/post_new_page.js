// frontend/js/post_new_page.js
import { createPost } from "./api.js";

const form = document.getElementById("newPostForm");
const textarea = form.elements["text"];
const msgEl = document.getElementById("newPostMessage");

// 폼 제출(글 등록)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msgEl.textContent = "";

  const text = textarea.value.trim();

  // 백엔드 validator와 맞춰서 최소 4자 체크
  if (text.length < 4) {
    msgEl.textContent = "내용은 최소 4자 이상 입력해주세요.";
    return;
  }

  try {
    // JWT는 api.js 안의 createPost()에서 자동으로 Authorization 헤더에 붙음
    await createPost(text);

    msgEl.textContent = "등록 성공! 목록으로 이동합니다.";
    setTimeout(() => {
      window.location.href = "./posts.html";
    }, 800);
  } catch (err) {
    // 401, 400 등 에러 메시지 표시
    msgEl.textContent = "등록 실패: " + err.message;
  }
});
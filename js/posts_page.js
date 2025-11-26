// frontend/js/posts_page.js
import { apiRequest } from "./api.js";

const tbody = document.getElementById("postList");
const msgEl = document.getElementById("listMessage");
const searchUserid = document.getElementById("searchUserid");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

// 게시글 목록 불러오기 (옵션: userid 검색)
async function loadPosts(userid = "") {
  msgEl.textContent = "";
  tbody.innerHTML = "";

  const query = userid ? `?userid=${encodeURIComponent(userid)}` : "";

  try {
    const posts = await apiRequest(`/post${query}`);
    if (!posts.length) {
      msgEl.textContent = "포스트가 없습니다.";
      return;
    }

    posts.forEach((p, idx) => {
      // 백엔드에서 id 또는 _id 둘 중 하나만 내려와도 동작하도록 방어 코드
      const postId = p.id || p._id;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${p.userid}</td>
        <td>
          ${
            postId
              ? `<a href="./post_detail.html?id=${postId}">${p.text}</a>`
              : p.text
          }
        </td>
        <td>${new Date(p.createdAt).toLocaleString()}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    msgEl.textContent = "목록 로딩 실패: " + err.message;
  }
}

searchBtn.addEventListener("click", () => {
  loadPosts(searchUserid.value.trim());
});

resetBtn.addEventListener("click", () => {
  searchUserid.value = "";
  loadPosts();
});

// 페이지 최초 로딩 시 전체 목록
loadPosts();

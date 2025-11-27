// frontend/js/posts_page.js
import { getPosts } from "./api.js";

const tbody = document.getElementById("postList");
const msgEl = document.getElementById("listMessage");

const useridInput = document.getElementById("useridSearch"); // ✅ HTML과 일치
const searchBtn = document.getElementById("searchBtn"); // ✅
const allBtn = document.getElementById("allBtn"); // ✅

// 게시글 목록 불러오기 (옵션: userid 검색)
async function loadPosts(userid = "") {
  msgEl.textContent = "";
  tbody.innerHTML = "";

  try {
    const posts = await getPosts(userid); // GET /post 또는 /post?userid=...

    if (!posts || !posts.length) {
      msgEl.textContent = "포스트가 없습니다.";
      return;
    }

    posts.forEach((p, idx) => {
      // id / _id 둘 다 방어 코드
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

// 검색 버튼
searchBtn.addEventListener("click", () => {
  const userid = useridInput.value.trim();
  loadPosts(userid);
});

// 전체 보기 버튼
allBtn.addEventListener("click", () => {
  useridInput.value = "";
  loadPosts();
});

// 페이지 최초 로딩 시 전체 목록
loadPosts();

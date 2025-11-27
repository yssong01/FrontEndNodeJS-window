// frontend/js/post_detail_page.js
import { apiRequest } from "./api.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const detailEl = document.getElementById("postDetail");
const msgEl = document.getElementById("detailMessage");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

async function loadPost() {
  try {
    const post = await apiRequest(`/post/${id}`);
    detailEl.innerHTML = `
      <h2>${post.userid}</h2>
      <p>${post.text}</p>
      <p class="detail-meta">
        작성자: ${post.name} / 작성일: ${new Date(
          post.createdAt
        ).toLocaleString()}
      </p>
    `;
  } catch (err) {
    msgEl.textContent = "상세 로딩 실패: " + err.message;
  }
}

editBtn.addEventListener("click", () => {
  window.location.href = `./post_edit.html?id=${id}`;
});

deleteBtn.addEventListener("click", async () => {
  if (!confirm("정말 삭제하시겠습니까?")) return;
  try {
    await apiRequest(`/post/${id}`, { method: "DELETE" });
    alert("삭제 완료");
    window.location.href = "./posts.html";
  } catch (err) {
    msgEl.textContent = "삭제 실패: " + err.message;
  }
});

loadPost();
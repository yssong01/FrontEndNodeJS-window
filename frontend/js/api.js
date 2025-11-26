// frontend/js/api.js

const API_BASE = "http://localhost:8000";

// ────────────── 토큰 헬퍼 ──────────────
export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.removeItem("token");
}

// ────────────── 내부 공통 fetch 래퍼 ──────────────
async function fetchJSON(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(API_BASE + path, {
    ...options,
    headers,
  });

  // 204(No Content) 대응
  if (res.status === 204) {
    return null;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = (data && data.message) || `Error ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

// ❗ 기존 페이지 코드 호환용: apiRequest 공개 함수
export function apiRequest(path, options = {}) {
  return fetchJSON(path, options);
}

// 로그인한 사용자 정보 (userid, name, url 등)
export async function fetchMe() {
  return fetchJSON("/auth/me", {
    method: "POST",
  });
}

// ────────────── 회원 관련 API ──────────────
export async function signup({ userid, password, name, email, url }) {
  return fetchJSON("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ userid, password, name, email, url }),
  });
}

export async function login({ userid, password }) {
  const data = await fetchJSON("/auth/login", {
    method: "POST",
    body: JSON.stringify({ userid, password }),
  });
  // { token, user } 형태라고 가정
  saveToken(data.token);
  return data;
}

// ────────────── 게시글 API ──────────────
export async function getPosts(userid = "") {
  const query = userid ? `?userid=${encodeURIComponent(userid)}` : "";
  return fetchJSON(`/post${query}`, { method: "GET" });
}

export async function getPost(id) {
  return fetchJSON(`/post/${id}`, { method: "GET" });
}

export async function createPost(text) {
  return fetchJSON("/post", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

export async function updatePost(id, text) {
  return fetchJSON(`/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({ text }),
  });
}

export async function deletePost(id) {
  // controller에서 200 + { message } 반환
  return fetchJSON(`/post/${id}`, {
    method: "DELETE",
  });
}

// ────────────── 댓글 API (확장용) ──────────────
// 백엔드에 /post/:id/comments가 있다고 가정
export async function getComments(postId) {
  return fetchJSON(`/post/${postId}/comments`, { method: "GET" });
}

export async function createComment(postId, text) {
  return fetchJSON(`/post/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}

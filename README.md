# 🚀 FrontEnd Fullstack Web Service ver1.1

학습 및 연습용으로 시도한 실제 서비스형 풀스택 웹 애플리케이션입니다.

아래 사항들을 활용하여 회원가입 → 로그인 → 글쓰기/수정/삭제 → 특정 id로 글 검색까지 가능한 구조를 구현했습니다.
- HTML/CSS/JavaScript 기반의 프론트엔드
- Node.js 기반 REST API 서버
- JWT 인증 시스템
- MongoDB Atlas
- Render(백엔드 배포)
- GitHub Pages(프론트 배포)

현재 ver1.1은 테스트용 임시 배포 버전으로, 실제 서비스의 구조에 최대한 부합하도록 하여 학습 및 프로젝트 포트폴리오용으로 활용할 수 있습니다.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

## 🌐 배포 주소

| 구분 | URL |
|------|-----|
| **Frontend** | [https://yssong01.github.io/FrontEndNodeJS-window/](https://yssong01.github.io/FrontEndNodeJS-window/) |
| **Backend** | [https://frontendnodejs-window.onrender.com](https://frontendnodejs-window.onrender.com) |
| **Database** | MongoDB Atlas (비공개) |

---

## 📚 프로젝트 개요

단순 CRUD를 넘어 **실제 서비스처럼 작동하는 완전한 풀스택 아키텍처**를 구축한 프로젝트입니다.

### ✨ 주요 특징

- 🎨 **프론트엔드**: Pure HTML/CSS/JS (프레임워크 없이 SPA 느낌 구현)
- 🛠️ **백엔드**: Node.js(Express) + JWT 인증 + CORS 정책
- 🗄️ **데이터베이스**: MongoDB Atlas (클라우드 DB)
- 🌐 **배포**: Frontend(GitHub Pages) + Backend(Render)
- 🔐 **보안**: JWT 토큰 기반 인증, bcrypt 비밀번호 암호화
- 👤 **권한 관리**: 본인이 작성한 글만 수정/삭제 가능

---

## 🧩 전체 시스템 아키텍처

```
┌────────────────────────────────────────────────────┐
│         GitHub Pages (Frontend)                    │
│    HTML/CSS/JS + Fetch API                         │
│    https://yssong01.github.io/                     │
└─────────────────┬──────────────────────────────────┘
                  │
                  │  HTTP Request
                  │  Authorization: Bearer <JWT>
                  │
                  ▼
┌────────────────────────────────────────────────────┐
│         Render (Node.js API Server)                │
│    Express + JWT + Bcrypt + CORS                   │
│    https://frontendnodejs-window.onrender.com      │
│                                                    │
│  ┌──────────────┐         ┌──────────────┐         │
│  │ Auth Router  │         │ Posts Router │         │
│  │ - 회원 가입   │        │ - 글 목록     │         │
│  │ - 로그인      │        │ - 글 작성     │         │
│  │ - 상태 유지   │        │ - 글 수정     │         │
│  └──────────────┘         │ - 글 삭제     │         │
│                           └──────────────┘         │
│                                                    │
│  ┌────────────────────────────────────────┐        │
│  │      JWT 인증 미들웨어 (isAuth)         │       │
│  │  - 토큰 검증                            │       │
│  │  - 사용자 확인                          │       │
│  │  - 권한 체크                            │       │
│  └────────────────────────────────────────┘        │
└─────────────────┬──────────────────────────────────┘
                  │
                  │  MongoDB Driver
                  │
                  ▼
┌────────────────────────────────────────────────────┐
│           MongoDB Atlas (Cloud Database)           │
│                                                    │
│  ┌─────────────────┐      ┌─────────────────┐      │
│  │ Users Collection│      │ Posts Collection│      │
│  │ - _id (ObjectId)│      │ - _id (ObjectId)│      │
│  │ - username      │      │ - text          │      │
│  │ - password      │      │ - userId        │      │
│  │ - name          │      │ - username      │      │
│  │ - email         │      │ - createdAt     │      │
│  │ - url           │      │ - updatedAt     │      │
│  └─────────────────┘      └─────────────────┘      │
└────────────────────────────────────────────────────┘
```

---

## 📂 프로젝트 구조

```
project-root/
│
├─ backend/
│   ├─ app.mjs                    # Express 앱 설정
│   ├─ config.mjs                 # 환경 변수 설정
│   ├─ router/
│   │   ├─ auth.mjs               # 인증 라우터
│   │   └─ posts.mjs              # 게시글 라우터
│   ├─ controller/
│   │   ├─ auth.mjs               # 인증 컨트롤러
│   │   └─ post.mjs               # 게시글 컨트롤러
│   ├─ middleware/
│   │   ├─ auth.mjs               # JWT 인증 미들웨어
│   │   └─ validator.mjs          # 입력값 검증
│   ├─ data/
│   │   ├─ auth.mjs               # 유저 데이터 로직
│   │   └─ post.mjs               # 게시글 데이터 로직
│   └─ db/
│       └─ database.mjs           # MongoDB 연결
│
└─ frontend/
    ├─ index.html                 # 메인 페이지
    ├─ login.html                 # 로그인 페이지
    ├─ signup.html                # 회원가입 페이지
    ├─ posts.html                 # 게시글 목록 페이지
    ├─ post_new.html              # 게시글 작성 페이지
    ├─ post_edit.html             # 게시글 수정 페이지
    ├─ post_detail.html           # 게시글 상세 페이지
    ├─ css/
    │   └─ style.css              # 전체 스타일
    └─ js/
        ├─ api.js                 # API 유틸 + Token 관리
        ├─ posts_page.js          # 목록 페이지 로직
        ├─ post_new_page.js       # 작성 페이지 로직
        ├─ post_edit_page.js      # 수정 페이지 로직
        └─ post_detail_page.js    # 상세 페이지 로직
```

---

## 🔐 인증 & 보안 구조 (JWT 기반)

### JWT 인증 흐름

```
1️⃣ 회원가입
   - userid/password/name/email 입력
   - 백엔드에서 bcrypt로 비밀번호 해싱
   - MongoDB에 사용자 정보 저장

2️⃣ 로그인
   - userid/password 입력
   - bcrypt로 해시 비교 검증
   - JWT 토큰 발급 (Payload: userId, username)
   - 프론트엔드에서 localStorage에 토큰 저장

3️⃣ 인증이 필요한 요청
   - 모든 글쓰기/조회/수정/삭제 API 호출 시
   - Authorization: Bearer <JWT> 헤더에 토큰 포함

4️⃣ 백엔드 검증 (isAuth 미들웨어)
   - JWT 토큰 추출 및 검증
   - 토큰에서 userId 추출
   - DB에서 사용자 존재 여부 확인
   - req.userId에 저장하여 다음 컨트롤러에 전달

5️⃣ 권한 체크
   - 글 수정/삭제 시 작성자 본인 확인
   - userId 일치 여부로 권한 판단
```

### 🛡️ 보안 포인트

| 항목 | 적용 내용 |
|------|----------|
| **비밀번호 암호화** | bcrypt 해싱 (salt rounds: 10) |
| **토큰 만료 시간** | JWT 유효 기간 설정 (7일) |
| **CORS 정책** | GitHub Pages 도메인만 허용 |
| **작성자 검증** | 본인이 작성한 글만 수정/삭제 가능 |
| **환경 변수** | MongoDB URI, JWT Secret 보호 |

---

## 📝 주요 기능

### 🔐 인증 (Auth)

- ✅ 회원가입
- ✅ 로그인 (JWT 토큰 발급)
- ✅ 로그인 상태 유지 (me)
- ✅ 로그아웃 (토큰 삭제)

### 📄 게시글 (Post)

- ✅ 전체 글 목록 조회
- ✅ 사용자 아이디(userid)로 검색
- ✅ 글 상세 보기
- ✅ 글 작성 (인증 필요)
- ✅ 글 수정 (본인 글만 가능)
- ✅ 글 삭제 (본인 글만 가능)

---

## 🛠️ Backend API 설계

### Auth API

| Method | URL | 설명 | 인증 |
|--------|-----|------|------|
| POST | `/auth/signup` | 회원가입 | ❌ |
| POST | `/auth/login` | 로그인 (JWT 발급) | ❌ |
| GET | `/auth/me` | 로그인 상태 유지 | ✅ |

### Post API

| Method | URL | 설명 | 인증 |
|--------|-----|------|------|
| GET | `/post` | 모든 글 목록 조회 | ✅ |
| GET | `/post?userid=xxx` | 특정 userid 글 조회 | ✅ |
| GET | `/post/:id` | 글 상세 조회 | ✅ |
| POST | `/post` | 글 작성 | ✅ |
| PUT | `/post/:id` | 글 수정 (본인만) | ✅ |
| DELETE | `/post/:id` | 글 삭제 (본인만) | ✅ |

---

## 🧭 동작 흐름 요약

```
┌─────────────┐
│  회원가입    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ 로그인 (서버가 JWT 발급) │
└───────────┬─────────────┘
            │ JWT
            ▼
┌───────────────────────────┐
│ localStorage에 토큰 저장   │
└───────────┬───────────────┘
            │
            ▼
┌─────────────────────────────────┐
│ posts.html (초기 로딩)           │
│  └─ GET /post  (헤더에 JWT 포함) │
└───────────┬─────────────────────┘
            │
            ├──► 글쓰기   ─ POST /post
            │
            ├──► 상세보기 ─ GET /post/:id
            │
            └──► 수정/삭제 ─ PUT/DELETE /post/:id
              (JWT 기반 사용자 검증, 본인 글만 가능)
```

---

## ⚙️ 주요 기술 스택

### 🎨 Frontend

| 기술 | 설명 |
|------|------|
| **HTML5** | 시맨틱 마크업 |
| **CSS3** | 반응형 UI 디자인 |
| **Vanilla JavaScript** | 프레임워크 없이 순수 JS로 구현 |
| **Fetch API** | 비동기 HTTP 통신 |
| **localStorage** | JWT 토큰 저장 |

### 🛠️ Backend

| 기술 | 설명 |
|------|------|
| **Node.js** | JavaScript 런타임 |
| **Express** | 웹 프레임워크 |
| **jsonwebtoken** | JWT 발급 및 검증 |
| **bcrypt** | 비밀번호 해싱 |
| **express-validator** | 입력값 검증 |
| **cors** | Cross-Origin 정책 설정 |

### 🗄️ Database

| 기술 | 설명 |
|------|------|
| **MongoDB Atlas** | 클라우드 NoSQL 데이터베이스 |
| **ObjectId** | 문서 고유 식별자 |
| **Collections** | users, posts |

### 🌐 배포

| 플랫폼 | 용도 |
|--------|------|
| **GitHub Pages** | Frontend 정적 호스팅 |
| **Render** | Backend API 서버 호스팅 |
| **MongoDB Atlas** | 클라우드 데이터베이스 |

---

## 🧪 문제 해결 기록 (Troubleshooting)

### 1️⃣ 로그인 오류 (Failed to fetch)

**문제점**
- API_BASE 주소가 localhost로 잘못 지정됨
- Render 무료 서버의 "슬립 모드"로 첫 요청 실패

**해결 방법**
- API_BASE를 Render 주소로 강제 고정
- 실패 시 재시도 안내 문구 추가
- 서버 웜업 시간 고려

### 2️⃣ 글 목록이 안 보임

**문제점**
- posts_page.js에서 잘못된 ID 선택자 사용
- Authorization 헤더 누락
- CORS origin 불일치

**해결 방법**
- ID 교정: `searchUserid` → `useridSearch`
- API_BASE를 Render 주소로 통일
- CORS에 GitHub Pages 도메인 허용

### 3️⃣ 수정/삭제 권한 안됨

**문제점**
- MongoDB에 저장된 작성자 `userId`와 JWT의 `req.userId` 불일치

**해결 방법**
- `authRepository.findById`의 반환 구조 통일
- `userId = user._id` 형태로 일관성 유지
- 권한 체크 로직 보강

---

## ✨ 프로젝트 특징 (Strengths)

| 특징 | 설명 |
|------|------|
| 🎯 **순수 JavaScript** | 프레임워크 없이 SPA 느낌 구현 |
| 🔐 **완전한 JWT 인증** | 토큰 발급부터 검증까지 전체 흐름 구현 |
| 🌐 **실전 배포 경험** | Render + GitHub Pages 연동 |
| 🗄️ **NoSQL 설계** | MongoDB Atlas 연동 및 Schema-less 설계 |
| 👤 **권한 관리** | 본인이 작성한 글만 수정/삭제 가능 |
| 🛡️ **보안 강화** | bcrypt 해싱, JWT 만료 시간, CORS 정책 |

---

## 📈 향후 확장 방향

- [ ] Refresh Token + Access Token 재발급 구조
- [ ] 댓글 기능 추가
- [ ] 글 페이징 처리 (무한 스크롤)
- [ ] 이미지 업로드 (AWS S3 연동)
- [ ] 전체 UI 반응형 고도화
- [ ] React.js 또는 Vue.js 리팩터링
- [ ] 소셜 로그인 (OAuth) 추가
- [ ] 실시간 알림 (WebSocket)

---

## 🏁 마무리

이 프로젝트는 단순 API 연동을 넘어 **"프론트엔드 + 백엔드 + 인증 + DB + 배포"**의 모든 과정을 한 번에 경험하도록 설계되었습니다.

실제 서비스 수준의 전체 개발 프로세스를 배웠고, JWT, API 설계, DB 모델링, 배포 환경까지 **풀스택 개발자로 성장하기 위한 기반**을 완성했습니다.

---

## 🎓 학습 포인트

- ✅ REST API 설계 및 프론트엔드 연동
- ✅ JWT 기반 인증 시스템 구현
- ✅ MongoDB 연동 및 CRUD 구현
- ✅ 클라우드 배포 (Render + GitHub Pages)
- ✅ CORS 정책 이해 및 적용
- ✅ 비동기 처리 (Async/Await, Fetch API)
- ✅ 보안 (비밀번호 해싱, 토큰 관리)
- ✅ 문제 해결 능력 (Troubleshooting)

---

## 👨‍💻 개발자

**yssong**

- 💻 GitHub: [https://github.com/yssong01](https://github.com/yssong01)
- 📝 Tistory: [https://memo1286.tistory.com/](https://memo1286.tistory.com/)

---






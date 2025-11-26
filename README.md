# 📝 프론트엔드 + Node.js API 연동 과제 (JWT 인증)

Node.js 백엔드 API와 HTML/CSS/JavaScript 프론트엔드를 연동한 **JWT 기반 인증 게시판** 프로젝트입니다. 브라우저에서 실제로 작동하는 완전한 웹 서비스 흐름을 구현합니다.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---

## 📌 과제 개요

백엔드 API를 실제로 호출하여 작동하는 **완전한 웹 서비스 흐름**을 구축하는 과제입니다. 

### 🔐 핵심 요구사항

- **모든 게시글 관련 기능**(조회/작성/수정/삭제)은 **JWT 인증 필수**
- 로그인 후 발급받은 JWT를 `Authorization: Bearer <token>` 헤더에 담아 요청
- HTML + CSS + JavaScript만 사용하여 브라우저용 프론트엔드 구현
- 백엔드 REST API와 실시간 연동

---

## 🎯 구현 요구사항 (총 8가지)

### 1️⃣ 회원가입 페이지 (`signup.html`)

- **입력 필드**: 아이디, 비밀번호, 이름, 이메일, 프로필 URL
- **UI 특징**:
  - Placeholder로 입력 가능한 문자 예시 안내
  - 로그인 페이지로 이동하는 링크 제공
  - 로그인 페이지와 동일한 디자인 구조
- **기능**: `/auth/signup` API 호출하여 회원 등록

### 2️⃣ 로그인 페이지 (`login.html`)

- **입력 필드**: 아이디, 비밀번호
- **UI 특징**:
  - "로그인 상태 유지" 체크박스 (텍스트와 높이 정렬)
  - 하단에 회원가입 버튼 배치
- **기능**:
  - `/auth/login` API 호출하여 JWT 토큰 발급
  - 토큰을 localStorage에 저장
  - 로그인 성공 시 자동으로 목록 페이지 이동

### 3️⃣ 포스트 목록 페이지 (`posts.html`)

- **접근 제한**: 로그인한 사용자만 접근 가능 (JWT 검증)
- **표시 정보**: 작성자, 내용, 작성일
- **UI 구성**:
  - 상단에 "글쓰기", "로그아웃" 버튼
  - 검색 입력창 및 검색 버튼
  - 검색 초기화 버튼
- **기능**:
  - 전체 게시글 목록 출력
  - 특정 userid로 검색 가능
  - 초기화 버튼으로 전체 목록 복원

### 4️⃣ 포스트 작성 페이지 (`post_new.html`)

- **입력 필드**: 게시글 내용 (textarea)
- **UI 특징**:
  - "등록"과 "취소" 버튼 나란히 배치
  - 동일한 폭, 녹색/빨간색
  - 부드러운 둥근 디자인
  - Hover 효과 적용
- **기능**:
  - JWT 인증 후 POST 요청 전송
  - 등록 성공 시 목록 페이지로 이동

### 5️⃣ 포스트 상세 페이지 (`post_detail.html`)

- **표시 정보**: 작성자, 작성일, 게시글 내용
- **UI 구성**: 수정/삭제 버튼 제공
- **기능**:
  - 특정 게시글의 상세 정보 조회
  - 수정 버튼 클릭 시 수정 페이지로 이동
  - 삭제 버튼 클릭 시 삭제 처리

### 6️⃣ 포스트 수정 페이지 (`post_edit.html`)

- **입력 필드**: 게시글 내용 (textarea)
- **UI 특징**:
  - 기존 게시글 내용을 자동으로 textarea에 반영
  - 수정/취소 버튼 (작성 페이지와 동일한 디자인)
- **기능**:
  - 수정 성공 시 상세 페이지로 자동 이동

### 7️⃣ 포스트 삭제 기능

- **확인 절차**: 삭제 버튼 클릭 시 confirm() 확인 창
- **기능**:
  - 백엔드 DELETE API 연동
  - 삭제 후 목록 페이지로 자동 이동

### 8️⃣ 특정 아이디 검색 기능

- **검색 방식**: userid 입력 후 검색 버튼 클릭
- **기능**:
  - 입력한 userid의 게시글만 필터링하여 표시
  - 초기화 버튼으로 전체 목록 복원

---

## 🛠️ 기술 스택

### Frontend

| 분류 | 기술 | 용도 |
|------|------|------|
| **마크업** | HTML5 | 페이지 구조 |
| **스타일** | CSS3 | UI 디자인 |
| **스크립트** | Vanilla JavaScript (ES6+) | API 통신, DOM 조작 |
| **인증** | JWT | localStorage 저장 및 헤더 전송 |

### Backend

| 분류 | 기술 | 용도 |
|------|------|------|
| **런타임** | Node.js | JavaScript 실행 환경 |
| **프레임워크** | Express.js | REST API 서버 |
| **데이터베이스** | MongoDB Atlas | 클라우드 데이터베이스 |
| **인증** | JWT (jsonwebtoken) | 토큰 발급 및 검증 |
| **검증** | express-validator | 입력값 유효성 검사 |

### 개발 도구

| 도구 | 용도 |
|------|------|
| **VS Code** | 통합 개발 환경, Live Server 테스트 |
| **Studio 3T** | MongoDB 데이터 관리 및 쿼리 |
| **Postman** | API 테스트 (회원가입/로그인/CRUD) |
| **Git** | 버전 관리 |

---

## 📂 프로젝트 구조

### Frontend 구조

```
frontend/
├── css/
│   └── style.css              # 전체 페이지 공통 스타일
├── js/
│   ├── api.js                 # 공통 API 유틸 + Token 관리
│   ├── posts_page.js          # 목록 페이지 로직
│   ├── post_detail_page.js    # 상세 페이지 로직
│   ├── post_new_page.js       # 작성 페이지 로직
│   └── post_edit_page.js      # 수정 페이지 로직
├── login.html                 # 로그인 페이지
├── signup.html                # 회원가입 페이지
├── posts.html                 # 게시글 목록 페이지
├── post_new.html              # 게시글 작성 페이지
├── post_detail.html           # 게시글 상세 페이지
└── post_edit.html             # 게시글 수정 페이지
```

### Backend 구조

```
backend/
├── controller/
│   ├── auth.mjs               # 인증 컨트롤러 (회원가입/로그인)
│   └── post.mjs               # 게시글 컨트롤러 (CRUD)
├── data/
│   ├── auth.mjs               # 유저 데이터 로직
│   └── post.mjs               # 게시글 데이터 로직
├── middleware/
│   ├── auth.mjs               # JWT 인증 미들웨어
│   └── validator.mjs          # 입력값 검증 미들웨어
├── router/
│   ├── auth.mjs               # 인증 라우터
│   └── posts.mjs              # 게시글 라우터
├── db/
│   └── database.mjs           # MongoDB Atlas 연결
├── .env                       # 환경 변수 (DB URI, JWT Secret)
├── app.mjs                    # Express 앱 설정
└── server.mjs                 # 서버 실행
```

---

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Browser)                    │
│                                                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ 회원가입  │  │  로그인   │  │   목록    │  │   상세   ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   작성    │  │   수정    │  │   삭제    │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                           │
│         ↕ HTTP Requests (with JWT Token)                │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│               Backend (Node.js + Express)                │
│                                                           │
│  ┌──────────────────┐         ┌──────────────────┐      │
│  │   Auth Router    │         │   Posts Router   │      │
│  │  /auth/signup    │         │   /posts (GET)   │      │
│  │  /auth/login     │         │   /posts (POST)  │      │
│  └──────────────────┘         │   /posts/:id     │      │
│                                └──────────────────┘      │
│           ↕                              ↕               │
│  ┌──────────────────┐         ┌──────────────────┐      │
│  │ Auth Controller  │         │  Post Controller │      │
│  └──────────────────┘         └──────────────────┘      │
│           ↕                              ↕               │
│  ┌──────────────────┐         ┌──────────────────┐      │
│  │   Auth Data      │         │    Post Data     │      │
│  └──────────────────┘         └──────────────────┘      │
│                                                           │
│         ↕ JWT Middleware (Token Verification)           │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────┐
│                   MongoDB Atlas (Cloud)                  │
│                                                           │
│  ┌─────────────────┐         ┌─────────────────┐        │
│  │  Users 컬렉션    │         │  Posts 컬렉션    │        │
│  │  - username     │         │  - author       │        │
│  │  - password     │         │  - text         │        │
│  │  - name         │         │  - createdAt    │        │
│  │  - email        │         │  - userId       │        │
│  └─────────────────┘         └─────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 JWT 인증 흐름

```
┌─────────────┐
│  회원가입    │
│ (signup)    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│  로그인 (login)                  │
│  - ID/비밀번호 입력               │
│  - 백엔드에서 검증                │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  JWT 토큰 발급                   │
│  - Payload: userId, username    │
│  - 만료 시간: 7일                │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  localStorage에 토큰 저장         │
│  key: "token"                   │
│  value: "eyJhbGc..."            │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  모든 API 요청에 토큰 포함         │
│  Authorization: Bearer <token>  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  백엔드 JWT 미들웨어 검증          │
│  - 토큰 유효성 확인               │
│  - 만료 여부 확인                 │
│  - Payload 추출 (userId)        │
└──────┬──────────────────────────┘
       │
       ├─── ✅ 유효 → 요청 처리
       │
       └─── ❌ 무효 → 401 Unauthorized
```

---

## 📡 API 엔드포인트

### 인증 API (JWT 불필요)

| Method | Endpoint | 설명 | 요청 Body |
|--------|----------|------|-----------|
| POST | `/auth/signup` | 회원가입 | username, password, name, email, url |
| POST | `/auth/login` | 로그인 | username, password |

### 게시글 API (JWT 필수)

| Method | Endpoint | 설명 | 요청 Header |
|--------|----------|------|------------|
| GET | `/posts` | 전체 포스트 조회 | Authorization: Bearer <token> |
| GET | `/posts?userid=username` | 특정 유저 포스트 조회 | Authorization: Bearer <token> |
| GET | `/posts/:id` | 포스트 상세 조회 | Authorization: Bearer <token> |
| POST | `/posts` | 포스트 작성 | Authorization: Bearer <token> |
| PUT | `/posts/:id` | 포스트 수정 | Authorization: Bearer <token> |
| DELETE | `/posts/:id` | 포스트 삭제 | Authorization: Bearer <token> |

---

## 🚀 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/jwt-auth-project.git
cd jwt-auth-project
```

### 2. 백엔드 설정 및 실행

```bash
cd backend
npm install
```

`.env` 파일 생성 및 환경 변수 설정:
- `MONGODB_URI`: MongoDB Atlas 연결 문자열
- `JWT_SECRET`: JWT 서명에 사용할 비밀키
- `JWT_EXPIRES_IN`: 토큰 만료 시간 (예: 7d)

```bash
npm start
```

백엔드 서버: `http://localhost:8080`

### 3. 프론트엔드 실행

**VS Code Live Server 사용 (권장)**
1. VS Code에서 `frontend` 폴더 열기
2. `login.html` 우클릭
3. "Open with Live Server" 선택

**Python 간이 서버**
```bash
cd frontend
python -m http.server 3000
```

프론트엔드: `http://localhost:3000`

---

## 🎓 학습 포인트

이 프로젝트를 통해 배울 수 있는 것들:

- ✅ **REST API 설계** - 백엔드 API 엔드포인트 구조화
- ✅ **JWT 인증 시스템** - 토큰 발급, 저장, 검증 전체 흐름
- ✅ **프론트엔드-백엔드 통신** - Fetch API를 활용한 HTTP 요청
- ✅ **MongoDB 연동** - NoSQL 데이터베이스 CRUD 구현
- ✅ **상태 관리** - localStorage를 활용한 클라이언트 상태 유지
- ✅ **에러 핸들링** - API 요청 실패 시 적절한 처리
- ✅ **비동기 처리** - Async/Await 패턴 활용
- ✅ **보안** - 비밀번호 해싱, JWT 기반 인증

---

## 📝 주요 기능 동작 흐름

### 게시글 작성 흐름

```
1. 사용자가 "글쓰기" 버튼 클릭
2. post_new.html로 이동
3. 게시글 내용 입력 후 "등록" 버튼 클릭
4. JavaScript에서 localStorage의 JWT 토큰 읽기
5. POST /posts API 호출 (Authorization 헤더에 토큰 포함)
6. 백엔드에서 JWT 검증 → 게시글 DB 저장
7. 성공 응답 받으면 posts.html로 자동 이동
8. 목록 페이지에서 새 게시글 확인
```

### 게시글 수정 흐름

```
1. 상세 페이지에서 "수정" 버튼 클릭
2. post_edit.html로 이동 (게시글 ID 전달)
3. GET /posts/:id로 기존 내용 조회
4. textarea에 기존 내용 자동 반영
5. 수정 후 "저장" 버튼 클릭
6. PUT /posts/:id API 호출 (JWT 포함)
7. 백엔드에서 게시글 업데이트
8. 성공 시 post_detail.html로 이동
```

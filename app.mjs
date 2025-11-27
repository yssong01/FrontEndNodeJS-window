// app.mjs
import express from "express";
import cors from "cors";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";

const app = express();

/**
 * CORS 설정
 * - 로컬에서 파일로 여는 경우(origin이 null)도 허용
 * - GitHub Pages, Render 등 외부 도메인에서도 접근 가능
 */
const corsOptions = {
  origin: (origin, callback) => {
    // origin이 없으면(파일로 열었을 때 등) 그냥 허용
    if (!origin) return callback(null, true);

    const allowed = [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:8080",
      "https://yssong01.github.io",
    ];

    if (allowed.includes(origin)) {
      callback(null, true);
    } else {
      // 개발 편의를 위해 일단 전부 허용 (필요하면 나중에 tighten)
      callback(null, true);
    }
  },
};
app.use(cors(corsOptions));

// JSON body 파싱
app.use(express.json());

// 라우터 등록
app.use("/post", postsRouter);
app.use("/auth", authRouter);

// 404 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

// DB 연결 후 서버 시작
connectDB()
  .then(() => {
    const port = config.host.port; // ✅ PORT / HOST_PORT / 9090 중 하나로 결정됨
    app.listen(port, () => {
      console.log(`서버 실행중! (포트: ${port})`);
    });
  })
  .catch(console.error);
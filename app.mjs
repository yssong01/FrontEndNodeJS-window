// app.mjs
import express from "express";
import cors from "cors";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";

const app = express();

// 브라우저의 다른 포트에서 오는 요청 허용 (개발용)
app.use(cors());

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
    app.listen(config.host.port, () => {
      console.log(`서버 실행중! (포트: ${config.host.port})`);
    });
  })
  .catch(console.error);

import express from 'express';
import cors from 'cors';
import { imageRoutes } from './routes/imageRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Express 앱 만들기
export const app = express();

// 웹사이트와 서버 연결 설정 (CORS)
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// JSON 데이터 받을 수 있게 설정 (최대 10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 이미지 관련 API 연결
app.use('/api/images', imageRoutes);

// 서버 상태 확인용 API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Pawtrait 서버가 정상 작동 중입니다!' 
  });
});

// 에러 처리
app.use(errorHandler);

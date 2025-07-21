import { Router } from 'express';
import {
  uploadImage,
  processImage,
  getImage,
} from '../controllers/imageController.js';
import { upload } from '../middlewares/upload.js';

// 이미지 관련 라우터 만들기
export const imageRoutes = Router();

// 이미지 업로드 API: POST /api/images/upload
imageRoutes.post('/upload', upload.single('image'), uploadImage);

// 이미지 변환 API: POST /api/images/process
imageRoutes.post('/process', processImage);

// 이미지 조회 API: GET /api/images/:id
imageRoutes.get('/:id', getImage);

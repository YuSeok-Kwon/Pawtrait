import { Request, Response } from 'express';
import { emotionService } from '../services/emotionService.js';
import { styleService } from '../services/styleService.js';

// 이미지 업로드 처리하기
export const uploadImage = async (req: Request, res: Response) => {
  try {
    // 파일이 없으면 에러
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: '이미지 파일이 없습니다' 
      });
    }

    // 업로드된 이미지 정보 만들기
    const imageInfo = {
      id: Date.now().toString(),
      originalUrl: `/uploads/${req.file.filename}`,
      processedUrl: '',
      style: 'ghibli',
      createdAt: new Date(),
      fileSize: req.file.size,
    };

    res.json({ success: true, data: imageInfo });
  } catch (error) {
    console.error('업로드 에러:', error);
    res.status(500).json({ 
      success: false, 
      error: '업로드에 실패했습니다' 
    });
  }
};

// 이미지를 지브리 스타일로 변환하기
export const processImage = async (req: Request, res: Response) => {
  try {
    const { imageId, style } = req.body;

    // 1단계: 반려동물 감정 분석하기
    const emotion = await emotionService.analyzeEmotion(imageId);
    
    // 2단계: 지브리 스타일로 변환하기
    const processedImage = await styleService.convertStyle(imageId, style, emotion);

    // 결과 보내기
    res.json({
      success: true,
      data: {
        id: imageId,
        status: 'completed',
        progress: 100,
        processedUrl: processedImage.url,
      },
    });
  } catch (error) {
    console.error('변환 에러:', error);
    res.status(500).json({ 
      success: false, 
      error: '이미지 변환에 실패했습니다' 
    });
  }
};

// 완성된 이미지 가져오기
export const getImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 이미지 정보 찾기 (나중에 데이터베이스에서 가져올 예정)
    const imageInfo = {
      id,
      originalUrl: '',
      processedUrl: '',
      style: 'ghibli',
      createdAt: new Date(),
    };

    res.json({ success: true, data: imageInfo });
  } catch (error) {
    console.error('이미지 조회 에러:', error);
    res.status(500).json({ 
      success: false, 
      error: '이미지를 찾을 수 없습니다' 
    });
  }
};

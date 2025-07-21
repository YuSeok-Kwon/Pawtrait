import { Request, Response, NextFunction } from 'express';

// 에러 처리 미들웨어
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('서버 에러 발생:', error);

  // 이미 응답을 보냈으면 다음으로 넘기기
  if (res.headersSent) {
    return next(error);
  }

  // 에러 응답 보내기
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? error.message  // 개발모드: 자세한 에러 메시지
      : '서버에서 문제가 발생했습니다',  // 운영모드: 간단한 메시지
  });
};

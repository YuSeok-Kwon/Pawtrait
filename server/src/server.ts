import { config } from 'dotenv';
import { app } from './app.js';

// 환경변수 파일(.env) 불러오기
config();

// 서버가 사용할 포트 번호
const PORT = process.env.PORT || 3002;

// 서버 시작하기!
app.listen(PORT, () => {
  console.log(`🚀 Pawtrait 서버가 ${PORT} 포트에서 실행 중입니다!`);
  console.log(`📊 환경: ${process.env.NODE_ENV || '개발모드'}`);
  console.log(`🔗 웹사이트 주소: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`✨ 준비 완료! 반려동물 이미지를 지브리 스타일로 변환할 수 있습니다!`);
});

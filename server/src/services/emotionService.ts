import axios from 'axios';

// 반려동물 감정 분석 서비스
class EmotionService {
  private apiUrl = 'https://api-inference.huggingface.co/models/nateraw/visual-emotion';
  private apiToken = process.env.HUGGINGFACE_API_TOKEN;

  // 이미지에서 반려동물 감정 분석하기
  async analyzeEmotion(imagePath: string): Promise<string> {
    try {
      console.log('반려동물 감정 분석 시작:', imagePath);

      // 나중에 실제 AI API 연결할 예정
      // 지금은 임시로 '행복' 감정 반환
      return 'happy';
      
    } catch (error) {
      console.error('감정 분석 실패:', error);
      // 에러가 나면 기본값으로 '중립' 반환
      return 'neutral';
    }
  }

  // 지원하는 감정 목록
  getSupportedEmotions(): string[] {
    return ['happy', 'sad', 'angry', 'surprised', 'neutral'];
  }
}

// 다른 파일에서 사용할 수 있도록 내보내기
export const emotionService = new EmotionService();

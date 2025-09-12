export interface EmotionData {
  emotion: string;
  name: string;
  icon: string;
  score: number;
  description: string;
  bgColor: string;
}

// 감정 타입별 정보
export const EMOTION_TYPES = {
  happy: {
    emotion: 'happy',
    name: '행복',
    icon: '😊',
    score: 85,
    description: '반려동물이 매우 행복하고 편안한 상태입니다.',
    bgColor: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  },
  sad: {
    emotion: 'sad',
    name: '슬픔',
    icon: '😢',
    score: 70,
    description: '반려동물이 조금 슬픈 감정을 보이고 있습니다.',
    bgColor: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
  },
  angry: {
    emotion: 'angry',
    name: '화남',
    icon: '😠',
    score: 75,
    description: '반려동물이 약간 화나거나 불편한 상태입니다.',
    bgColor: 'linear-gradient(135deg, #FF6347 0%, #DC143C 100%)',
  },
  surprised: {
    emotion: 'surprised',
    name: '놀람',
    icon: '😲',
    score: 80,
    description: '반려동물이 놀라거나 호기심을 보이고 있습니다.',
    bgColor: 'linear-gradient(135deg, #FF69B4 0%, #C71585 100%)',
  },
} as const;

export type EmotionType = keyof typeof EMOTION_TYPES;

// 기본 감정 데이터 (API 연동 전 mock 데이터)
export const DEFAULT_EMOTION_DATA: EmotionData = EMOTION_TYPES.happy;
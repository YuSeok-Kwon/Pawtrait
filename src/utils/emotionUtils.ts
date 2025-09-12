import { EMOTION_TYPES, EmotionType } from '../constants';

/**
 * 감정 ID로 감정 정보를 가져오는 유틸리티 함수
 */
export const getEmotionInfo = (emotionId: string) => {
  return EMOTION_TYPES[emotionId as EmotionType] || EMOTION_TYPES.happy;
};

/**
 * 감정 ID 검증
 */
export const isValidEmotionId = (emotionId: string): boolean => {
  return emotionId in EMOTION_TYPES;
};

/**
 * 감정 점수에 따른 상태 메시지 생성
 */
export const getEmotionStatusMessage = (score: number): string => {
  if (score >= 80) return '매우 좋은 상태입니다!';
  if (score >= 60) return '좋은 상태입니다.';
  if (score >= 40) return '보통 상태입니다.';
  return '주의가 필요한 상태입니다.';
};
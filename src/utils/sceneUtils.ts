import { SCENE_TYPES, SceneType } from '../constants/scenes';

/**
 * 장면 ID로 장면 정보를 가져오는 유틸리티 함수
 */
export const getSceneInfo = (sceneId: string) => {
  return SCENE_TYPES[sceneId as SceneType] || SCENE_TYPES.sitting;
};

/**
 * 장면 ID 검증
 */
export const isValidSceneId = (sceneId: string): boolean => {
  return sceneId in SCENE_TYPES;
};

/**
 * 장면 분석 신뢰도에 따른 상태 메시지 생성
 */
export const getSceneConfidenceMessage = (confidence: number): string => {
  if (confidence >= 90) return '매우 정확한 분석입니다!';
  if (confidence >= 70) return '정확한 분석입니다.';
  if (confidence >= 50) return '어느 정도 정확한 분석입니다.';
  return '참고용 분석 결과입니다.';
};
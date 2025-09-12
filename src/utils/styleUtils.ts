import { STYLE_INFO, SOCIAL_STYLE_INFO, DEFAULT_STYLE, StyleType } from '../constants';

/**
 * 스타일 ID로 스타일 정보를 가져오는 유틸리티 함수
 */
export const getStyleInfo = (styleId: string) => {
  return STYLE_INFO[styleId as StyleType] || STYLE_INFO[DEFAULT_STYLE];
};

/**
 * 소셜 공유용 스타일 정보를 가져오는 유틸리티 함수
 */
export const getSocialStyleInfo = (styleId: string) => {
  return SOCIAL_STYLE_INFO[styleId as StyleType] || SOCIAL_STYLE_INFO[DEFAULT_STYLE];
};

/**
 * 스타일에 따른 변환된 이미지 URL 생성
 */
export const generateTransformedImageUrl = (styleName: string) => {
  return `https://via.placeholder.com/400x400/e8d5b7/333?text=${styleName}+변환`;
};

/**
 * 스타일 ID 검증
 */
export const isValidStyleId = (styleId: string): boolean => {
  return styleId in STYLE_INFO;
};

/**
 * 공유 URL 생성
 */
export const generateShareUrl = (style: string, emotion: string) => {
  return `/share?style=${style}&emotion=${emotion}`;
};

/**
 * 변환 URL 생성
 */
export const generateTransformUrl = (style: string) => {
  return `/transform?style=${style}`;
};
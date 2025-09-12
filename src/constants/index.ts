// 상수들을 한 곳에서 export
export * from './emotions';
export * from './styles';

// 기타 앱 전반에서 사용하는 상수들
export const APP_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  API_BASE_URL: '/api',
  DEFAULT_TIMEOUT: 30000, // 30초
} as const;

// 페이지 경로 상수
export const ROUTES = {
  HOME: '/',
  UPLOAD: '/upload',
  RESULT: '/result',
  TRANSFORM: '/transform',
  SHARE: '/share',
} as const;

// 플레이스홀더 이미지 URL
export const PLACEHOLDER_IMAGES = {
  ORIGINAL: 'https://via.placeholder.com/400x400/f5f5f5/666?text=원본+이미지',
  AI_PORTRAIT: 'https://via.placeholder.com/400x400/e8e8e8/666?text=AI+Portrait',
  UPLOADED_PHOTO: 'https://via.placeholder.com/400x300/f5f5f5/999?text=Uploaded+Photo',
  PROCESSING_1: 'https://via.placeholder.com/400x400/f0f0f0/999?text=AI+분석중...',
  PROCESSING_2: 'https://via.placeholder.com/400x400/e0e0e0/777?text=스타일+적용중...',
} as const;
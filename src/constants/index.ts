// 상수들을 한 곳에서 export
export * from './scenes';
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
  ORIGINAL: '/upload/main-image.png',
  AI_PORTRAIT: '/upload/main-image.png', // 로컬 이미지로 변경
  UPLOADED_PHOTO: '/upload/main-image.png', // 로컬 이미지로 변경
  PROCESSING_1: '/upload/scene-analysis.png',
  PROCESSING_2: '/upload/scene-analysis.png', // 로컬 이미지로 변경
} as const;

// 애니메이션 단계별 설정
export const ANIMATION_STAGES = {
  ORIGINAL: {
    name: 'original' as const,
    label: '원본 이미지',
    duration: 1000,
    description: '업로드된 반려동물 사진'
  },
  SCENE_ANALYSIS: {
    name: 'processing1' as const,
    label: '장면 분석 중',
    duration: 2000,
    description: 'AI가 반려동물의 포즈와 배경을 분석하고 있습니다'
  },
  STYLE_PROCESSING: {
    name: 'processing2' as const,
    label: '스타일 적용 중',
    duration: 2500,
    description: '선택한 스타일로 변환하고 있습니다'
  },
  FINAL: {
    name: 'final' as const,
    label: '변환 완료',
    duration: 1000,
    description: '아름다운 작품이 완성되었습니다'
  }
} as const;
export interface StyleOption {
  id: string;
  name: string;
  description?: string;
  color?: string;
  imageSrc?: string;
}

export interface StyleInfo {
  name: string;
  description: string;
  color: string;
}

// 스타일 옵션 목록
export const STYLE_OPTIONS: StyleOption[] = [
  { 
    id: 'ghibli', 
    name: '지브리',
    imageSrc: 'upload/zhibli-style.png'
  },
  { 
    id: 'pixel', 
    name: '픽셀아트',
    imageSrc: 'upload/pixel-art-style.png'
  },
  { 
    id: 'picasso', 
    name: '피카소',
    imageSrc: 'upload/picaso-style.png'
  },
  { 
    id: 'pokemon', 
    name: '포켓몬',
    imageSrc: 'upload/pocketmon-style.png'
  },
];

// 스타일별 상세 정보
export const STYLE_INFO = {
  ghibli: {
    name: '지브리',
    description: '따뜻하고 몽환적인 지브리 스튜디오 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)',
  },
  pixel: {
    name: '픽셀아트',
    description: '8비트 게임 느낌의 픽셀 아트 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #FF7043 0%, #F4511E 100%)',
  },
  picasso: {
    name: '피카소',
    description: '입체파의 거장 피카소 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
  },
  pokemon: {
    name: '포켓몬',
    description: '귀엽고 생동감 넘치는 포켓몬 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
  },
} as const;

export type StyleType = keyof typeof STYLE_INFO;

// 소셜 미디어용 간단한 스타일 정보 (SharePage용)
export const SOCIAL_STYLE_INFO = {
  ghibli: { name: '지브리', color: '#81C784' },
  pixel: { name: '픽셀아트', color: '#FF7043' },
  picasso: { name: '피카소', color: '#9C27B0' },
  pokemon: { name: '포켓몬', color: '#42A5F5' },
} as const;

// 기본 스타일
export const DEFAULT_STYLE: StyleType = 'ghibli';
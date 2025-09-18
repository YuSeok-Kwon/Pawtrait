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
    id: 'attack_titan', 
    name: '진격의 거인',
    imageSrc: 'upload/attack-on-titan-style.png'
  },
  { 
    id: 'demon_slayer', 
    name: '귀멸의 칼날',
    imageSrc: 'upload/demon-slayer-kimetsu-no-yaiba-style.png'
  },
  { 
    id: 'one_piece', 
    name: '원피스',
    imageSrc: 'upload/one-piece-style.png'
  },
  { 
    id: 'picasso', 
    name: '피카소',
    imageSrc: 'upload/picasso-style.png'
  },
  { 
    id: 'pixel', 
    name: '픽셀아트',
    imageSrc: 'upload/pixel-art-style.png'
  },
  { 
    id: 'lego', 
    name: '레고',
    imageSrc: 'upload/lego-style.png'
  },
  { 
    id: 'cyberpunk', 
    name: '사이버펑크',
    imageSrc: 'upload/cyberpunk-style.png'
  },
];

// 스타일별 상세 정보
export const STYLE_INFO = {
  attack_titan: {
    name: '진격의 거인',
    description: '극적이고 강렬한 진격의 거인 애니메이션 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #8D6E63 0%, #5D4037 100%)',
  },
  demon_slayer: {
    name: '귀멸의 칼날',
    description: '아름답고 역동적인 귀멸의 칼날 애니메이션 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #E91E63 0%, #AD1457 100%)',
  },
  one_piece: {
    name: '원피스',
    description: '밝고 모험적인 원피스 애니메이션 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
  },
  picasso: {
    name: '피카소',
    description: '추상적이고 실험적인 피카소 큐비즘 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
  },
  pixel: {
    name: '픽셀아트',
    description: '향수를 불러일으키는 8비트 픽셀 아트 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
  },
  lego: {
    name: '레고',
    description: '장난감 같고 귀여운 레고 미니피규어 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
  },
  cyberpunk: {
    name: '사이버펑크',
    description: '미래적이고 네온 가득한 사이버펑크 스타일로 변환되었습니다.',
    color: 'linear-gradient(135deg, #E91E63 0%, #9C27B0 100%)',
  },
} as const;

export type StyleType = keyof typeof STYLE_INFO;

// 소셜 미디어용 간단한 스타일 정보 (SharePage용)
export const SOCIAL_STYLE_INFO = {
  attack_titan: { name: '진격의 거인', color: '#8D6E63' },
  demon_slayer: { name: '귀멸의 칼날', color: '#E91E63' },
  one_piece: { name: '원피스', color: '#FF9800' },
  picasso: { name: '피카소', color: '#9C27B0' },
  pixel: { name: '픽셀아트', color: '#4CAF50' },
  lego: { name: '레고', color: '#2196F3' },
  cyberpunk: { name: '사이버펑크', color: '#E91E63' },
} as const;

// 기본 스타일
export const DEFAULT_STYLE: StyleType = 'attack_titan';
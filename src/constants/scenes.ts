export interface SceneData {
  scene: string;
  name: string;
  icon: string;
  confidence: number;
  description: string;
  bgColor: string;
}

// 장면 분석 타입별 정보
export const SCENE_TYPES = {
  sitting: {
    scene: 'sitting',
    name: '앉기',
    icon: '🐕',
    confidence: 85,
    description: '반려동물이 편안하게 앉아있는 모습입니다.',
    bgColor: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
  },
  lying: {
    scene: 'lying',
    name: '누워있기',
    icon: '😴',
    confidence: 90,
    description: '반려동물이 편안하게 누워서 쉬고 있습니다.',
    bgColor: 'linear-gradient(135deg, #98FB98 0%, #228B22 100%)',
  },
  standing: {
    scene: 'standing',
    name: '서있기',
    icon: '🦮',
    confidence: 80,
    description: '반려동물이 활기차게 서있는 모습입니다.',
    bgColor: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  },
  running: {
    scene: 'running',
    name: '뛰기',
    icon: '🏃‍♂️',
    confidence: 75,
    description: '반려동물이 신나게 뛰어다니고 있습니다.',
    bgColor: 'linear-gradient(135deg, #FF6347 0%, #DC143C 100%)',
  },
  playing: {
    scene: 'playing',
    name: '놀기',
    icon: '🎾',
    confidence: 85,
    description: '반려동물이 즐겁게 놀고 있는 모습입니다.',
    bgColor: 'linear-gradient(135deg, #FF69B4 0%, #C71585 100%)',
  },
} as const;

export type SceneType = keyof typeof SCENE_TYPES;

// 기본 장면 데이터 (API 연동 전 mock 데이터)
export const DEFAULT_SCENE_DATA: SceneData = SCENE_TYPES.sitting;
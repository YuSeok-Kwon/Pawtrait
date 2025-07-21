// 전역 타입 정의
declare global {
  interface Window {
    // 필요한 경우 window 객체에 사용자 정의 속성 추가
  }
}

// 프로젝트 특정 타입들
export interface PetImageData {
  id: string;
  originalUrl: string;
  processedUrl: string;
  style: 'ghibli' | 'pixar' | 'anime';
  createdAt: Date;
  metadata?: {
    width: number;
    height: number;
    fileSize: number;
  };
}

export interface ShareOptions {
  platform: 'twitter' | 'instagram' | 'facebook';
  message?: string;
  imageUrl: string;
}

export interface ProcessingStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  message?: string;
}

// API 응답 타입들
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadResponse extends ApiResponse<PetImageData> {}
export interface ProcessResponse extends ApiResponse<ProcessingStatus> {}

// 이벤트 타입들
export interface CustomEvents {
  'image-uploaded': CustomEvent<PetImageData>;
  'processing-complete': CustomEvent<PetImageData>;
  'processing-error': CustomEvent<{ error: string }>;
}

// 유틸리티 타입들
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// API 엔드포인트 타입들
export interface UploadImageRequest {
  file: File;
  style?: 'ghibli' | 'pixar' | 'anime';
}

export interface ProcessImageRequest {
  imageId: string;
  style: 'ghibli' | 'pixar' | 'anime';
  emotion?: string;
}

export {};

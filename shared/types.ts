// 반려동물 이미지 정보
export interface PetImageData {
  id: string;
  originalUrl: string; // 원본 이미지 주소
  processedUrl: string; // 변환된 이미지 주소
  style: 'ghibli' | 'anime' | 'cartoon';
  createdAt: Date;
  fileSize: number;
}

// 공유 옵션
export interface ShareOptions {
  platform: 'twitter' | 'instagram' | 'facebook';
  message?: string;
  imageUrl: string;
}

// 처리 상태
export interface ProcessingStatus {
  id: string;
  status: 'waiting' | 'processing' | 'completed' | 'error';
  progress: number; // 0~100
  message?: string;
}

// API 응답 형식
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 업로드 요청
export interface UploadImageRequest {
  file: File;
  style?: 'ghibli' | 'anime' | 'cartoon';
}

// 처리 요청
export interface ProcessImageRequest {
  imageId: string;
  style: 'ghibli' | 'anime' | 'cartoon';
  emotion?: string;
}

// API 응답 타입들
export interface UploadResponse extends ApiResponse<PetImageData> {}
export interface ProcessResponse extends ApiResponse<ProcessingStatus> {}

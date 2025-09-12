// 유틸리티 함수들을 한 곳에서 export
export * from './styleUtils';
export * from './emotionUtils';

// 공통으로 사용되는 유틸리티 함수들
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T => {
  let timeout: number;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(null, args), wait);
  }) as T;
};
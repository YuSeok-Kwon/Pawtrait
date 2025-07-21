import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 설정 파일 (개발 서버 설정)
export default defineConfig({
  // React 플러그인 사용
  plugins: [react()],

  // 경로 별칭 설정
  resolve: {
    alias: {
      '@': '/src', // '@'는 src 폴더
      '@shared': '../shared', // '@shared'는 공용 폴더
    },
  },

  // 개발 서버 설정
  server: {
    port: 3000, // 웹사이트 포트
    proxy: {
      '/api': {
        target: 'http://localhost:3002', // 백엔드 서버 주소
        changeOrigin: true,
      },
    },
  },
});

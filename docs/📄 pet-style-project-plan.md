# 반려동물 사진 분석 및 스타일 변환 플랫폼 기획안

## 1. 프로젝트 개요

사용자가 반려견 또는 반려묘의 사진을 업로드하면,  
- AI가 사진 속 반려동물의 표정이나 감정을 분석해 설명을 제공하고  
- 다양한 스타일(지브리, 피카소, 픽셀아트, 포켓몬 등)로 이미지 변환을 수행하며  
- 결과 이미지를 SNS(X, Instagram 등)에 공유할 수 있는 플랫폼

## 2. 핵심 기능

### 2.1 사용자 기능
- 회원가입 및 로그인 (JWT 기반 인증)
- 반려동물 사진 업로드
- 사진 감정 및 표정 분석 결과 제공
- 이미지 스타일 변환
- 변환 결과 저장 및 공유 기능 (X, Instagram 등)

### 2.2 관리 기능
- 사용자 관리 (관리자용 API 고려)
- 이미지 분석 및 변환 로그 기록
- 부적절한 이미지 필터링 (향후 확장 고려)

## 3. 기술 스택

- 프론트엔드: React + TypeScript
- 백엔드: Node.js (Express) + TypeScript
- 데이터베이스: MongoDB 또는 PostgreSQL (예정)
- 인증 및 보안: JWT, bcrypt
- 파일 저장: AWS S3 또는 유사한 스토리지
- AI 연동: 외부 이미지 분석 및 스타일 변환 API 또는 자체 모델
- 배포: Docker + Cloud (EC2, Vercel 등 고려)

## 4. 폴더 구조 예시

```
project-root/
  client/
    src/
      components/
      pages/
      hooks/
      api/
      styles/
  server/
    src/
      controllers/
      routes/
      services/
      middlewares/
      models/
      utils/
```

## 5. API 설계 개요

- POST /auth/signup
- POST /auth/login
- POST /image/upload
- GET /image/:id/analysis
- POST /image/:id/style-transform
- GET /image/:id/share
- GET /share/:id (공유용 미리보기 페이지)

---

# Todo List

## 1. 프로젝트 세팅

- [ ] Git 레포지토리 생성 및 초기화
- [ ] ESLint, Prettier 설정
- [ ] 공통 TS 설정 (strict 모드 포함)
- [ ] Monorepo 또는 client/server 분리 방식 결정

## 2. 인증 기능

- [ ] JWT 기반 로그인 / 회원가입 API 개발
- [ ] bcrypt를 이용한 비밀번호 해싱
- [ ] 인증 미들웨어 구현

## 3. 이미지 업로드

- [ ] 이미지 업로드 API (Multer 등 활용)
- [ ] AWS S3 등 외부 저장소 연동
- [ ] 업로드 후 URL 반환 로직

## 4. 분석 기능

- [ ] 이미지 감정/표정 분석 API 연동
- [ ] 분석 결과 정리 및 사용자 친화적 설명 제공
- [ ] 분석 결과 저장 및 불러오기 API 구현

## 5. 스타일 변환

- [ ] 스타일 선택 UI 구성
- [ ] 스타일 변환 요청 API (Stable Diffusion 또는 외부 API 연동)
- [ ] 변환된 이미지 저장 및 URL 제공

## 6. 공유 기능

- [ ] 공유용 링크 생성 및 미리보기 페이지 구성 (/share/:id)
- [ ] X 공유 텍스트 및 이미지 링크 구성
- [ ] Instagram용 다운로드 버튼 제공

## 7. 프론트엔드 구현

- [ ] 회원가입/로그인 페이지
- [ ] 이미지 업로드 및 분석 결과 페이지
- [ ] 스타일 변환 페이지
- [ ] 공유 버튼 및 결과 화면

## 8. 배포 및 테스트

- [ ] 프론트/백엔드 환경별 배포 스크립트 구성
- [ ] Dockerfile 및 CI/CD 구성
- [ ] API 테스트 (Postman, Jest 등 활용)
- [ ] 전체 기능 통합 테스트

---
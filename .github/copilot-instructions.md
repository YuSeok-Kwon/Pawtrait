# Pawtrait - AI Pet Image Style Conversion

Pawtrait은 반려동물 사진을 AI로 분석하고 다양한 스타일로 변환하는 포트폴리오 프로젝트입니다.

## 프로젝트 아키텍처

### 기술 스택
- **Frontend**: React 18 + TypeScript + Vite
- **Backend** (계획): Express + TypeScript + Node.js
- **AI Services**: HuggingFace (감정분석) + OpenAI DALL-E (스타일변환)
- **Authentication**: JWT 토큰 기반 인증 + bcrypt 암호화
- **API**: RESTful 규칙 준수

### 폴더 구조 패턴
```
pawtrait/
├── client/          # React 프론트엔드 (현재 작업 중)
├── server/          # Express 백엔드 (구현 예정)
└── shared/          # 공통 타입 정의
```

현재 작업 디렉토리는 프론트엔드 부분으로, 향후 `client/` 폴더로 이동 예정입니다.

## 코딩 컨벤션

### 컴포넌트 구조
- **폴더별 컴포넌트**: 각 컴포넌트는 독립적인 폴더 구조
- **CSS 모듈**: `ComponentName.module.css` 패턴 사용
- **index.ts 배럴**: 각 컴포넌트 폴더에 index.ts로 export

```
components/Button/
├── Button.tsx
├── Button.module.css
└── index.ts
```

### TypeScript 패턴
- **Interface 네이밍**: `ComponentNameProps` 형태
- **Optional Props**: size, className 등은 기본값 제공
- **Theme 시스템**: 'primary' | 'secondary' 타입 활용
- **Path Alias**: `@/` (src), `@shared/` (공통 타입) 사용

### 스타일링 규칙
- **CSS 모듈**: 모든 컴포넌트별 스타일 격리
- **색상 팔레트**: 
  - Primary: `#b8a082` (갈색 계열)
  - Secondary border: `#e8d5b7` (베이지 계열)
  - Hover: `#a08972` (어두운 갈색)
- **브랜딩**: 따뜻하고 자연스러운 반려동물 테마 색상

### 라우팅 구조
```
/ → MainPage (소개 + 히어로 섹션)
/upload → UploadPage (사진 업로드)
/transform → TransformPage (변환 진행 + 애니메이션)  
/result → ResultPage (결과 표시)
/share → SharePage (공유 기능)
```

## 주요 기능 구현

### 1. 페이지 컴포넌트 구조
- **MainPage**: 섹션 기반 구성 (`HeroSection`, `GuideSection`, `ExampleSection`, `PricingSection`)
- **Navigation**: `react-router-dom`으로 SPA 구현
- **Layout**: `GNB` + 페이지 콘텐츠 + `Footer` 구조

### 2. 애니메이션 시스템
- **Custom Hook**: `useTransformAnimation.ts`로 변환 애니메이션 관리
- **Stage 기반**: 'original' → 'processing1' → 'processing2' → 'final'
- **상태 관리**: progress, speed, currentStage 추적

### 3. 스타일 변환 기능 (구현 예정)
- **지브리 스타일**: 애니메이션 풍 변환
- **픽사 스타일**: 3D 애니메이션 느낌
- **피카소 스타일**: 추상적 아트 스타일  
- **포켓몬 스타일**: 게임 캐릭터 스타일
- **픽셀아트**: 8비트 게임 느낌

## 개발 워크플로우

### 설정 파일
- **Vite 개발서버**: 포트 3000, API 프록시 `/api` → `localhost:3002`
- **TypeScript**: strict 모드, path mapping 설정
- **ESLint + Prettier**: 코드 품질 관리 (`npm run lint:fix`, `npm run format`)

### 빌드 및 실행
```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드  
npm run type-check   # TypeScript 검사
npm run preview      # 빌드 결과 미리보기
```

### 백엔드 연동 (구현 예정)
- **API Base URL**: `/api` 프록시를 통한 백엔드 연동
- **파일 업로드**: Multer 사용한 이미지 처리
- **인증**: JWT 토큰 기반, localStorage 저장
- **데이터베이스**: 사용자 정보, 변환 이력 저장

## 개발 시 주의사항

1. **컴포넌트 생성** 시 CSS 모듈과 index.ts 파일 함께 생성
2. **새 페이지 추가** 시 App.tsx의 Routes에 경로 등록 필요
3. **스타일링**은 기존 색상 팔레트 유지하며 따뜻한 톤 사용
4. **타입 정의**는 향후 shared/ 폴더로 분리 예정
5. **API 연동** 시 axios 사용, 에러 핸들링 필수
6. **이미지 파일**은 public/upload/ 경로에 저장
7. **절대** AI를 사용했다는 티를 내지 말 것. 모든 코드는 사람이 작성한 것처럼 자연스럽게 작성할 것.
8. 나는 지금 **주니어 개발자**이며 독학으로 이 프로젝트를 진행하고 있고 실력을 키우고 있습니다. 따라서 복잡한 최적화나 고급 패턴보다는 **주니어 개발자가 할 수 있는 범위 내**에서 **가독성과 유지보수성**을 우선시하여 코드를 작성해 주세요.


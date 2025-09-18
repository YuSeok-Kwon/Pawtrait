# Pawtrait Frontend

AI 기반 반려동물 사진 분석 및 스타일 변환 웹 애플리케이션입니다.

## 🌟 주요 기능

### 📸 이미지 업로드 & 분석
- 드래그 앤 드롭 또는 클릭으로 간편 업로드
- YOLO-pose 기반 정밀 포즈 분석 (앉음/누움/서기/뛰기/놀기)
- 배경 환경 자동 인식 (실내/실외/잔디/침대 등)
- AI 생성 스토리텔링 제공

### 🎨 스타일 변환
- **지브리**: 따뜻한 애니메이션 스타일
- **픽사**: 3D 애니메이션 느낌
- **피카소**: 추상적 아트 스타일
- **포켓몬**: 귀여운 캐릭터 스타일
- **픽셀아트**: 8비트 레트로 게임 스타일

### 🔄 인터랙티브 UI
- 변환 과정 실시간 애니메이션
- Before/After 슬라이더 비교
- 원클릭 이미지 다운로드
- 반응형 디자인 (모바일 최적화)

## 🚀 실행 방법

```bash
npm install
npm run dev          # 개발 서버 (포트 3000)
npm run build        # 프로덕션 빌드
npm run preview      # 빌드된 결과 미리보기
```

## 🛠️ 기술 스택

**Frontend Framework**
- React 18 + TypeScript
- Vite (빌드 도구)
- CSS Modules (스타일링)

**상태 관리 & 로직**
- Context API (이미지/인증 상태)
- Custom Hooks (변환 로직, URL 파라미터)
- React Router (페이지 라우팅)

**UI/UX**
- 반응형 CSS Grid/Flexbox
- 드래그 앤 드롭 인터페이스
- 로딩 애니메이션 및 트랜지션
- 알림 시스템 (성공/에러 메시지)

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── Button/         # 버튼 컴포넌트
│   ├── ImageComparison/ # Before/After 슬라이더
│   ├── Notice/         # 알림 컴포넌트
│   └── TransformAnimation/ # 변환 애니메이션
├── contexts/           # React Context 상태 관리
├── hooks/              # 커스텀 훅
├── pages/              # 페이지 컴포넌트
├── utils/              # 유틸리티 함수
└── constants/          # 상수 정의
```

## 🎯 페이지 흐름

1. **MainPage** (`/`) - 서비스 소개 및 시작
2. **UploadPage** (`/upload`) - 이미지 업로드 
3. **TransformPage** (`/transform`) - 분석 및 변환 진행
4. **ResultPage** (`/result`) - 결과 확인 및 비교
5. **SharePage** (`/share`) - 결과 공유 (예정)

## 🔗 API 연동

**백엔드 서버**: `http://localhost:3002`

- `POST /api/images/upload` - 이미지 업로드
- `POST /api/images/analyze` - YOLO-pose 포즈 분석 + 배경 분석
- `POST /api/images/process` - 스타일 변환 (분석 결과 활용)
- `GET /api/images/:id` - 이미지 정보 조회

## 🎨 디자인 시스템

**색상 팔레트**
- Primary: `#b8a082` (따뜻한 갈색)
- Secondary: `#e8d5b7` (베이지)
- Hover: `#a08972` (어두운 갈색)
- 전체적으로 반려동물 친화적인 자연스러운 톤

**타이포그래피**
- 제목: 굵은 폰트로 임팩트
- 본문: 읽기 쉬운 중간 굵기
- 버튼: 명확한 액션 텍스트

## 🔮 향후 계획

- [ ] 소셜 로그인 연동 (구글, 카카오)
- [ ] 갤러리 기능 (변환 이력 저장)  
- [ ] 실시간 진행률 표시 (WebSocket)
- [ ] PWA 지원 (오프라인 사용)
- [ ] 다국어 지원 (i18n)


# 🐾 Pawtrait 프로젝트 구조 설계 가이드

## ✅ 주요 요구사항
- React + Vite + TypeScript 프론트엔드
- Node.js + Express + TypeScript 백엔드
- RESTful API 설계
- 이미지 업로드 → 감정 분석 → 스타일 변환 → 결과 반환
- 외부 API 연동 (HuggingFace, OpenAI)
- JWT 인증
- 확장 가능성 (SNS 공유, PvP, 피드 등)

---

## 📁 추천 폴더 구조

```
pawtrait/
├── client/               # 프론트엔드
│   ├── public/
│   └── src/
│       ├── assets/       # 이미지, 아이콘, 전역 스타일
│       ├── components/   # 재사용 컴포넌트
│       ├── pages/        # 각 View 페이지 (Home, Upload, Result 등)
│       ├── api/          # axios 인스턴스 + API 함수
│       ├── hooks/        # 커스텀 훅
│       ├── routes/       # 라우팅 설정
│       ├── types/        # 전역 타입 정의
│       └── utils/        # 클라이언트 유틸
│       └── main.tsx
│       └── App.tsx
│
├── server/               # 백엔드
│   ├── src/
│   │   ├── controllers/  # API 요청 핸들러
│   │   ├── routes/       # API 라우팅
│   │   ├── services/     # 외부 API 호출, 비즈니스 로직
│   │   ├── middlewares/  # 인증, 에러 핸들링
│   │   ├── utils/        # 파일 처리, 경로 등
│   │   ├── models/       # 유저, 이미지, 결과 등 DB 모델 (선택)
│   │   ├── config/       # 환경설정 (OpenAI, HuggingFace 등)
│   │   ├── app.ts        # 익스프레스 설정
│   │   └── server.ts     # 서버 실행 진입점
│   ├── uploads/          # 이미지 저장 위치
│   ├── .env
│   └── tsconfig.json
│
├── shared/               # (선택) 프론트/백 공통 타입, 상수 등
├── .gitignore
├── README.md
└── package.json
```

---

## 🧩 구조별 역할 요약

| 역할                  | 위치                            | 설명 |
|-----------------------|----------------------------------|------|
| 이미지 업로드         | `server/routes/upload.ts`        | 파일 저장 + 감정 분석 |
| 감정 분석 로직        | `server/services/emotionService.ts` | HuggingFace API 연동 |
| 스타일 변환 로직      | `server/services/styleService.ts`   | OpenAI DALL·E 연동 |
| 업로드 화면           | `client/pages/UploadPage.tsx`     | 이미지 업로드 및 선택 |
| 결과 미리보기         | `client/pages/ResultPage.tsx`     | 이미지 + 감정 + 스타일 |
| SNS 공유 컴포넌트     | `client/components/SnsShare.tsx`   | 공유 버튼 모듈화 |
| 인증 처리             | `server/middlewares/auth.ts`      | JWT 인증 |
| 타입 정의             | `client/types/`, `shared/`        | Emotion, Result 등 DTO |

---

## 🔄 흐름 예시

1. 사용자가 사진 업로드
2. `/api/upload` → 감정 분석 결과 반환
3. `/api/style` → 스타일 변환 이미지 반환
4. 프론트에서 미리보기 + SNS 공유

---

## 🧱 향후 확장 고려

| 확장 예정 기능 | 고려 구조 요소 |
|----------------|----------------|
| SNS 피드/공유   | 결과 타입 분리, SNSShare 컴포넌트화 |
| 유저 인증       | User 모델, JWT 인증 |
| 히스토리 관리   | DB 저장 및 결과 목록 API |
| 자체 모델 연동   | Python Flask 서버와 API 통신 |
| 커스터마이징 UI | 전역 context + Tailwind/styled-components |

---

## 📦 개발 편의 라이브러리

- 백엔드: `express`, `openai`, `axios`, `dotenv`, `cors`, `helmet`
- 프론트: `vite`, `axios`, `react-router-dom`, `react-hook-form`, `tailwindcss`, `react-share`

# 반려동물 감정 분석 후 아트 스타일 변환 로직

## 1. 전체 흐름 요약

1. 사용자가 업로드한 반려동물 이미지에서 감정 분석 수행  
2. 분석 결과 기반으로 스타일 변환 요청 (예: 지브리, 피카소 등)  
3. AI 이미지 생성기(Stable Diffusion 등)에 요청  
4. 변환된 이미지 생성 후 저장  
5. 클라이언트에 URL 또는 변환된 이미지 전송

---

## 2. 백엔드 로직 구성

### 2.1 요청 API

```
POST /api/images/:id/style
Body: {
  style: "ghibli" | "picasso" | "pixel" | "pokemon"
}
```

- 기존에 업로드한 이미지(`id`)를 불러옴
- 감정 분석 결과(예: "happy")와 함께 스타일 생성 프롬프트 조합

### 2.2 프롬프트 생성 예시

```ts
// stylePromptMap.ts
export const stylePrompts = {
  ghibli: (emotion) => `A cute dog in Studio Ghibli style, looking ${emotion}`,
  picasso: (emotion) => `A dog portrait in the style of Picasso, expressing ${emotion}`,
  pixel: (emotion) => `A pixel art dog sprite showing a ${emotion} mood`,
  pokemon: (emotion) => `A Pokémon-style dog with a ${emotion} expression`,
};
```

### 2.3 이미지 생성 API 연동 예시 (Hugging Face / Stable Diffusion)

```ts
const response = await axios.post(
  'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
  { inputs: prompt },
  {
    headers: {
      Authorization: `Bearer YOUR_HF_API_KEY`,
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer', // 이미지 받을 경우
  }
);

// 저장 후 URL 응답
```

---

## 3. 프론트엔드 로직 구성

### 3.1 감정 분석 완료 후 스타일 선택 UI

```tsx
const handleStyleChange = async (style: string) => {
  const res = await axios.post(`/api/images/${imageId}/style`, { style });
  setStyledImage(res.data.imageUrl);
};
```

### 3.2 결과 렌더링

```tsx
{styledImage && <img src={styledImage} alt="Art style result" />}
```

---

## 4. 전체 처리 흐름 요약

1. 감정 분석 완료 후 스타일 선택
2. 백엔드에서 감정 + 스타일 → 프롬프트 구성
3. AI 이미지 생성 API 요청
4. 변환 이미지 저장
5. 프론트엔드에 결과 이미지 전송 및 표시

---

## 5. 실전 팁

- 프롬프트 튜닝이 생성 이미지 퀄리티에 큰 영향
- 다양한 스타일 프롬프트 템플릿 미리 준비
- 큐 처리나 비동기 요청으로 처리 시간 최적화 가능
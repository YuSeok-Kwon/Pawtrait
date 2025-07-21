
# 🐾 Pawtrait 스타일 변환 기능 구현 정리

## ✅ 목표 기능
1. 이미지 업로드 후 감정 분석 (HuggingFace API)
2. 스타일 변환 (OpenAI ChatGPT/DALL·E 활용)
3. 프론트 미리보기 + SNS 공유

---

## 1. 감정 분석 (HuggingFace Inference API)

- 모델: `nateraw/visual-emotion`
- API 토큰 필요
- 업로드된 반려동물 이미지에 대해 감정 추론

### 📄 emotionService.ts
```ts
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const HUGGINGFACE_API_TOKEN = process.env.HF_API_TOKEN!;
const EMOTION_MODEL_URL = 'https://api-inference.huggingface.co/models/nateraw/visual-emotion';

export const analyzeEmotion = async (imagePath: string) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(imagePath));

  const response = await axios.post(EMOTION_MODEL_URL, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
    },
  });

  return response.data[0]; // label, score
};
```

---

## 2. 스타일 변환 (OpenAI ChatGPT API 활용)

- DALL·E를 활용한 프롬프트 기반 이미지 생성
- 이미지-to-이미지 기능은 추후 지원 예정
- 프롬프트 기반 변환: 지브리, 픽셀아트, 포켓몬

### 📄 styleService.ts
```ts
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateStyledImage = async (imagePath: string, style: 'ghibli' | 'pixel' | 'pokemon') => {
  const imageBuffer = fs.readFileSync(imagePath);

  const stylePromptMap = {
    ghibli: 'Turn this pet photo into a Studio Ghibli-style image.',
    pixel: 'Convert this pet photo into retro 8-bit pixel art.',
    pokemon: 'Make this pet photo look like a Pokémon creature.',
  };

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: stylePromptMap[style],
    n: 1,
    size: '1024x1024',
    response_format: 'url',
  });

  return response.data[0].url;
};
```

---

## 3. 프론트엔드 결과 미리보기 + SNS 공유

### 📄 ResultPage.tsx
```tsx
import { useLocation } from 'react-router-dom';

export default function ResultPage() {
  const { state } = useLocation();
  const { imageUrl, emotion, styledImageUrl } = state || {};

  return (
    <div>
      <h2>감정: {emotion?.label} ({Math.round(emotion?.score * 100)}%)</h2>

      <div style={ display: 'flex', gap: '2rem' }>
        <div>
          <p>원본 이미지</p>
          <img src={imageUrl} alt="original" width={300} />
        </div>
        <div>
          <p>스타일 변환</p>
          <img src={styledImageUrl} alt="styled" width={300} />
        </div>
      </div>

      <div style={ marginTop: '2rem' }>
        <p>공유하기:</p>
        <a href="{`https://twitter.com/intent/tweet?text=내 반려동물 감정은 ${emotion?.label}!&url=${window.location.href}`}" target="_blank">X 공유</a>
        <a href="{`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}" target="_blank">Facebook 공유</a>
      </div>
    </div>
  );
}
```

---

## 🔐 환경 변수 설정 (.env 예시)
```
HF_API_TOKEN=your_huggingface_api_token
OPENAI_API_KEY=your_openai_api_key
```

---

## 📌 정리
- 감정 분석: HuggingFace 시각 감정 모델
- 스타일 변환: OpenAI DALL·E로 prompt 기반 생성
- 추후 OpenAI image-to-image 지원되면 기능 확장 가능
- 프론트엔드에서 결과 이미지 + 공유까지 구현 완료

⏱ 작성일: 2025-07-19

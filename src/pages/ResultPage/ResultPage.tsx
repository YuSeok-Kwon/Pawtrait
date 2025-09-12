import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import css from './ResultPage.module.css';
import { DEFAULT_EMOTION_DATA } from '../../constants';
import { PhotoDisplay, EmotionAnalysis, StyleSelector, ActionButtons } from './components';

export default function ResultPage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  // API에서 받아올 데이터 (현재는 mock)
  const emotionData = DEFAULT_EMOTION_DATA;

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const handleTransform = () => {
    navigate(`/transform?style=${selectedStyle}`);
  };

  const handleShare = () => {
    navigate('/share?style=original&emotion=happy');
  };

  const handleRetakePhoto = () => {
    navigate('/upload');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={css.resultPage}>
      <div className={css.container}>
        <h1 className={css.title}>감정 분석 결과</h1>

        <div className={css.resultContent}>
          <PhotoDisplay />

          <EmotionAnalysis emotionData={emotionData} />

          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleSelect}
            onTransform={handleTransform}
          />
        </div>

        <ActionButtons
          onShare={handleShare}
          onRetakePhoto={handleRetakePhoto}
          onGoHome={handleGoHome}
        />
      </div>
    </div>
  );
}

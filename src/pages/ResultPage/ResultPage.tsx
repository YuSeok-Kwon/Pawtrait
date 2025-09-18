import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './ResultPage.module.css';
import { DEFAULT_EMOTION_DATA } from '../../constants';
import { EmotionAnalysis, StyleSelector, ActionButtons } from './components';
import { useImage } from '../../contexts/ImageContext';

export default function ResultPage() {
  const navigate = useNavigate();
  const { currentPhoto, selectedStyle, setSelectedStyle } = useImage();
  const [emotionData, setEmotionData] = useState(DEFAULT_EMOTION_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 감정 분석 API 호출
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let mounted = true;

    const analyzeEmotion = async () => {
      if (!currentPhoto) {
        setIsLoading(false);
        return;
      }

      try {
        // 실제 API 호출 (임시로 더미 데이터 사용)
        // TODO: 실제 백엔드 API 연결
        console.log('감정 분석 API 호출:', currentPhoto);

        // 임시 지연
        timeoutId = setTimeout(() => {
          if (!mounted) return;

          const randomEmotions = ['happy', 'sad', 'angry', 'surprised', 'neutral'];
          const randomEmotion = randomEmotions[Math.floor(Math.random() * randomEmotions.length)];

          const mockEmotion = {
            emotion: randomEmotion,
            name: randomEmotion === 'happy' ? '행복' :
              randomEmotion === 'sad' ? '슬픔' :
                randomEmotion === 'angry' ? '화남' : '중립',
            icon: randomEmotion === 'happy' ? '😊' :
              randomEmotion === 'sad' ? '😢' :
                randomEmotion === 'angry' ? '😠' : '😐',
            score: Math.floor(Math.random() * 30) + 70, // 70-99 사이
            description: `반려동물이 ${randomEmotion === 'happy' ? '행복한' : '특별한'} 감정을 보이고 있습니다.`,
            bgColor: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
          };

          setEmotionData(mockEmotion);
          setIsLoading(false);
        }, 1500);

      } catch (error) {
        console.error('감정 분석 실패:', error);
        if (mounted) {
          setEmotionData(DEFAULT_EMOTION_DATA);
          setIsLoading(false);
        }
      }
    };

    analyzeEmotion();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentPhoto]);

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
          {isLoading ? (
            <div className={css.loadingSection}>
              <h2>감정 분석 중...</h2>
              <p>AI가 반려동물의 감정을 분석하고 있습니다</p>
            </div>
          ) : (
            <EmotionAnalysis emotionData={emotionData} />
          )}

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

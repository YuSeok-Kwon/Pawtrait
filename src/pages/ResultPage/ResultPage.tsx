import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImage } from '../../contexts/ImageContext';
import { DEFAULT_SCENE_DATA } from '../../constants';
import { SceneAnalysis, StyleSelector, ActionButtons } from './components';
import css from './ResultPage.module.css';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentPhoto } = useImage();
  const [sceneData, setSceneData] = useState(DEFAULT_SCENE_DATA);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('original');

  // 컴포넌트 마운트 시 장면 분석 API 호출
  useEffect(() => {
    if (!currentPhoto) {
      navigate('/upload');
      return;
    }

    const analyzeScene = async () => {
      try {
        setIsAnalyzing(true);

        // TODO: 실제 장면 분석 API 호출
        // const response = await fetch('/api/analyze-scene', {
        //   method: 'POST',
        //   body: formData
        // });

        console.log('장면 분석 API 호출:', currentPhoto);

        // 임시로 랜덤 장면 데이터 생성 (실제 API 연동 전)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock 데이터 생성
        const randomScenes = ['sitting', 'lying', 'standing', 'running', 'playing'];
        const randomScene = randomScenes[Math.floor(Math.random() * randomScenes.length)];

        const mockScene = {
          scene: randomScene,
          name: randomScene === 'sitting' ? '앉기' :
            randomScene === 'lying' ? '누워있기' :
              randomScene === 'standing' ? '서있기' :
                randomScene === 'running' ? '뛰기' : '놀기',
          icon: randomScene === 'sitting' ? '🐕' :
            randomScene === 'lying' ? '😴' :
              randomScene === 'standing' ? '🦮' :
                randomScene === 'running' ? '🏃‍♂️' : '🎾',
          confidence: Math.floor(Math.random() * 30) + 70, // 70-100 사이
          description: `반려동물이 ${randomScene === 'sitting' ? '편안하게 앉은' : '특별한'} 자세를 보이고 있습니다.`,
          bgColor: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
        };

        setSceneData(mockScene);

      } catch (error) {
        console.error('장면 분석 실패:', error);
        // 실패 시 기본 데이터 사용
        setSceneData(DEFAULT_SCENE_DATA);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeScene();
  }, [currentPhoto, navigate]);

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
  };

  const handleTransform = () => {
    // 선택한 스타일과 분석된 장면 정보를 포함하여 변환 페이지로 이동
    const sceneParam = sceneData?.scene || 'sitting';
    navigate(`/transform?style=${selectedStyle}&scene=${sceneParam}`);
  };

  const handleNewPhoto = () => {
    navigate('/upload');
  };

  const handleShare = () => {
    // 임시로 원본 스타일과 현재 장면으로 공유 페이지 이동
    const sceneParam = sceneData?.scene || 'sitting';
    navigate(`/share?style=original&scene=${sceneParam}`);
  };

  if (!currentPhoto) {
    return <div>사진을 업로드해주세요.</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.content}>
        <header className={css.header}>
          <h1 className={css.title}>장면 분석 결과</h1>
        </header>

        <div className={css.resultSection}>
          {isAnalyzing ? (
            <div className={css.loading}>
              <h2>장면 분석 중...</h2>
              <p>AI가 반려동물의 포즈와 배경을 분석하고 있습니다</p>
            </div>
          ) : (
            <SceneAnalysis sceneData={sceneData} />
          )}
        </div>

        {!isAnalyzing && (
          <>
            <StyleSelector
              selectedStyle={selectedStyle}
              onStyleSelect={handleStyleSelect}
              onTransform={handleTransform}
            />
            <ActionButtons
              onShare={handleShare}
              onRetakePhoto={handleNewPhoto}
              onGoHome={() => navigate('/')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
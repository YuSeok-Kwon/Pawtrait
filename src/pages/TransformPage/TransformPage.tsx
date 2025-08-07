import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import TransformAnimation from '../../components/TransformAnimation';
import css from './TransformPage.module.css';

export default function TransformPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAnimation, setShowAnimation] = useState(true);

  // URL 파라미터에서 선택된 스타일 가져오기 (예: /transform?style=ghibli)
  const searchParams = new URLSearchParams(location.search);
  const selectedStyle = searchParams.get('style') || 'ghibli';

  // 스타일별 정보
  const styleInfo = {
    ghibli: {
      name: '지브리',
      description: '따뜻하고 몽환적인 지브리 스튜디오 스타일로 변환되었습니다.',
      color: 'linear-gradient(135deg, #81C784 0%, #4CAF50 100%)',
    },
    pixel: {
      name: '픽셀아트',
      description: '8비트 게임 느낌의 픽셀 아트 스타일로 변환되었습니다.',
      color: 'linear-gradient(135deg, #FF7043 0%, #F4511E 100%)',
    },
    picasso: {
      name: '피카소',
      description: '입체파의 거장 피카소 스타일로 변환되었습니다.',
      color: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
    },
    pokemon: {
      name: '포켓몬',
      description: '귀엽고 생동감 넘치는 포켓몬 스타일로 변환되었습니다.',
      color: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)',
    },
  };

  const currentStyle =
    styleInfo[selectedStyle as keyof typeof styleInfo] || styleInfo.ghibli;

  // 애니메이션 완료 시 결과 화면으로 전환
  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  // 애니메이션 건너뛰기
  const skipAnimation = () => {
    setShowAnimation(false);
  };

  if (showAnimation) {
    return (
      <div className={css.transformPage}>
        <div className={css.container}>
          <div className={css.animationSection}>
            <TransformAnimation
              originalImage="https://via.placeholder.com/400x400/f5f5f5/666?text=원본+이미지"
              transformedImage={`https://via.placeholder.com/400x400/e8d5b7/333?text=${currentStyle.name}+변환`}
              style={currentStyle.name}
              onComplete={handleAnimationComplete}
            />
            
            <div className={css.skipSection}>
              <button 
                onClick={skipAnimation}
                className={css.skipButton}
              >
                건너뛰기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.transformPage}>
      <div className={css.container}>
        <h1 className={css.title}>스타일 변환 완료!</h1>

        <div
          className={css.styleInfo}
          style={{ background: currentStyle.color }}
        >
          <h2 className={css.styleName}>{currentStyle.name} 스타일</h2>
          <p className={css.styleDescription}>{currentStyle.description}</p>
        </div>

        <div className={css.resultContent}>
          <div className={css.beforeAfter}>
            <div className={css.imageSection}>
              <h3 className={css.sectionTitle}>원본 초상화</h3>
              <div className={css.imageContainer}>
                <img
                  src="https://via.placeholder.com/350x350/f5f5f5/666?text=원본+이미지"
                  alt='원본 AI 초상화'
                  className={css.resultImage}
                />
              </div>
            </div>

            <div className={css.arrow}>
              <div className={css.arrowIcon}>→</div>
            </div>

            <div className={css.imageSection}>
              <h3 className={css.sectionTitle}>변환된 초상화</h3>
              <div className={css.imageContainer}>
                <img
                  src={`https://via.placeholder.com/350x350/e8d5b7/333?text=${currentStyle.name}+변환`}
                  alt={`${currentStyle.name} 스타일 초상화`}
                  className={css.resultImage}
                />
              </div>
            </div>
          </div>

          {/* 다시 애니메이션 보기 버튼 */}
          <div className={css.replaySection}>
            <button 
              onClick={() => setShowAnimation(true)}
              className={css.replayButton}
            >
              🎬 변환 과정 다시 보기
            </button>
          </div>
        </div>

        <div className={css.actionButtons}>
          <button className={css.activeBtn}>변환된 이미지 다운로드</button>
          <button
            onClick={() =>
              navigate(`/share?style=${selectedStyle}&emotion=happy`)
            }
            className={css.shareButton}
          >
            작품 공유하기
          </button>
          <button
            onClick={() => navigate('/result')}
            className={css.backButton}
          >
            이전으로
          </button>
          <button onClick={() => navigate('/upload')} className={css.newButton}>
            새로운 사진으로
          </button>
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TransformAnimation from '../../components/TransformAnimation';
import Button from '../../components/Button';
import css from './TransformPage.module.css';
import { PLACEHOLDER_IMAGES } from '../../constants';
import { useUrlParams } from '../../hooks/useUrlParams';
import { getStyleInfo, generateTransformedImageUrl, generateShareUrl } from '../../utils';

export default function TransformPage() {
  const navigate = useNavigate();
  const { getStyleParam } = useUrlParams();
  const [showAnimation, setShowAnimation] = useState(true);

  // URL 파라미터에서 선택된 스타일 가져오기
  const selectedStyle = getStyleParam();
  const currentStyle = getStyleInfo(selectedStyle);

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
              originalImage={PLACEHOLDER_IMAGES.ORIGINAL}
              transformedImage={generateTransformedImageUrl(currentStyle.name)}
              style={currentStyle.name}
              onComplete={handleAnimationComplete}
            />

            <div className={css.skipSection}>
              <Button onClick={skipAnimation} theme="white" size="small">
                건너뛰기 →
              </Button>
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
                  src={PLACEHOLDER_IMAGES.ORIGINAL}
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
            <Button
              onClick={() => setShowAnimation(true)}
              theme="white"
              size="medium"
              bordered
            >
              🎬 변환 과정 다시 보기
            </Button>
          </div>
        </div>

        <div className={css.actionButtons}>
          <Button theme="beige" size="medium">변환된 이미지 다운로드</Button>
          <Button
            onClick={() =>
              navigate(generateShareUrl(selectedStyle, 'happy'))
            }
            theme="white"
            bordered
            size="medium"
          >
            작품 공유하기
          </Button>
          <Button
            onClick={() => navigate('/result')}
            theme="white"
            bordered
            size="medium"
          >
            이전으로
          </Button>
          <Button onClick={() => navigate('/upload')} theme="beige" size="medium">
            새로운 사진으로
          </Button>
        </div>
      </div>
    </div>
  );
}

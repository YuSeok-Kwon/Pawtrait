import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TransformAnimation from '../../components/TransformAnimation';
import Button from '../../components/Button';
import ImageComparison from '../../components/ImageComparison';
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
          {/* 비교 슬라이더 */}
          <div className={css.comparisonSection}>
            <h3 className={css.comparisonTitle}>변환 전후 비교</h3>
            <ImageComparison
              beforeImage={PLACEHOLDER_IMAGES.ORIGINAL}
              afterImage={generateTransformedImageUrl(currentStyle.name)}
              beforeLabel=""
              afterLabel=""
            />
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

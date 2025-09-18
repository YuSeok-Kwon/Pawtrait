import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TransformAnimation from '../../components/TransformAnimation';
import Button from '../../components/Button';
import ImageComparison from '../../components/ImageComparison';
import Notice from '../../components/Notice';
import css from './TransformPage.module.css';
import { PLACEHOLDER_IMAGES } from '../../constants';
import { useUrlParams } from '../../hooks/useUrlParams';
import { useImage } from '../../contexts/ImageContext';
import { getStyleInfo, generateShareUrl, downloadImage } from '../../utils';
import { useStyleTransform } from '@/hooks/useStyleTransform';

export default function TransformPage() {
  const navigate = useNavigate();
  const { currentPhoto } = useImage();
  const { getStyleParam } = useUrlParams();
  const [showAnimation, setShowAnimation] = useState(true);
  // URL 파라미터에서 선택된 스타일 가져오기 먼저 수행
  const selectedStyle = getStyleParam();
  const { transformedImage, isTransforming, isFallback, applyFilter, toggleFilter, emotion } = useStyleTransform({ style: selectedStyle });

  const currentStyle = getStyleInfo(selectedStyle);

  // 업로드된 이미지가 있으면 사용, 없으면 플레이스홀더 사용
  const originalImage = currentPhoto || PLACEHOLDER_IMAGES.ORIGINAL;

  // 변환 로직은 useStyleTransform 훅으로 이동

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
            {isTransforming ? (
              <div className={css.loadingSection}>
                <h2>변환 준비 중...</h2>
                <p>AI가 이미지를 분석하고 있습니다</p>
                <div className={css.spinner}></div>
              </div>
            ) : (
              <TransformAnimation
                originalImage={originalImage}
                transformedImage={transformedImage}
                style={currentStyle.name}
                onComplete={handleAnimationComplete}
              />
            )}

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
        {isFallback && (
          <Notice type="warning" title="예시 이미지 사용 중">
            OpenAI API 키가 설정되지 않아 샘플 스타일 이미지가 표시됩니다.
            <br />
            <div style={{ marginTop: 8 }}>
              <Button size="small" theme="white" bordered onClick={toggleFilter}>
                {applyFilter ? '필터 끄기' : '필터 적용'}
              </Button>
            </div>
          </Notice>
        )}

        <div
          className={css.styleInfo}
          style={{ background: currentStyle.color }}
        >
          <h2 className={css.styleName}>{currentStyle.name} 스타일</h2>
          <p className={css.styleDescription}>{currentStyle.description}</p>
          {emotion && (
            <div className={css.emotionBox} style={{ marginTop: 12 }}>
              <strong>감정 분석 결과:</strong> <span>{emotion}</span>
            </div>
          )}
        </div>

        <div className={css.resultContent}>
          {/* 비교 슬라이더 */}
          <div className={css.comparisonSection}>
            <h3 className={css.comparisonTitle}>변환 전후 비교</h3>
            <div style={applyFilter ? { filter: 'contrast(1.05) saturate(1.08)' } : undefined}>
              <ImageComparison
                beforeImage={originalImage}
                afterImage={transformedImage}
                beforeLabel=""
                afterLabel=""
              />
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
          <Button
            theme="beige"
            size="medium"
            onClick={() => transformedImage && downloadImage(transformedImage, `pawtrait_${selectedStyle || 'style'}.png`)}
          >
            변환된 이미지 다운로드
          </Button>
          <Button
            onClick={() =>
              navigate(generateShareUrl(selectedStyle, emotion || 'unknown'))
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

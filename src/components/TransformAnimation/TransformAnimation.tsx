import { useState, useEffect, useRef } from 'react';
import css from './TransformAnimation.module.css';

interface TransformAnimationProps {
  originalImage: string;
  transformedImage: string;
  style: string;
  onComplete?: () => void;
}

type AnimationStage = 'original' | 'processing1' | 'processing2' | 'final';

export default function TransformAnimation({
  originalImage,
  transformedImage,
  style,
  onComplete
}: TransformAnimationProps) {
  const [currentStage, setCurrentStage] = useState<AnimationStage>('original');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1); // 1x, 1.5x, 2x 속도
  const intervalRef = useRef<number | null>(null);

  // 단계별 이미지 정의
  const stages: Record<AnimationStage, { image: string; label: string; duration: number }> = {
    original: {
      image: originalImage,
      label: '원본 이미지',
      duration: 1000
    },
    processing1: {
      image: 'https://via.placeholder.com/400x400/f0f0f0/999?text=AI+분석중...',
      label: 'AI 분석 중',
      duration: 1500
    },
    processing2: {
      image: 'https://via.placeholder.com/400x400/e0e0e0/777?text=스타일+적용중...',
      label: `${style} 스타일 적용 중`,
      duration: 2000
    },
    final: {
      image: transformedImage,
      label: `${style} 스타일 완성`,
      duration: 1000
    }
  };

  const stageOrder: AnimationStage[] = ['original', 'processing1', 'processing2', 'final'];

  // 애니메이션 시작/정지
  const toggleAnimation = () => {
    if (isPlaying) {
      pauseAnimation();
    } else {
      startAnimation();
    }
  };

  // 애니메이션 시작
  const startAnimation = () => {
    if (intervalRef.current) return;

    setIsPlaying(true);
    let currentIndex = stageOrder.indexOf(currentStage);
    let progressValue = progress;

    intervalRef.current = window.setInterval(() => {
      const currentStageName = stageOrder[currentIndex];
      const stageDuration = stages[currentStageName].duration / speed;

      progressValue += (100 / stageDuration) * 50; // 50ms 간격으로 업데이트

      if (progressValue >= 100) {
        progressValue = 0;
        currentIndex = (currentIndex + 1) % stageOrder.length;

        const nextStage = stageOrder[currentIndex];
        setCurrentStage(nextStage);

        // 마지막 단계 완료 시
        if (nextStage === 'final' && currentIndex === stageOrder.length - 1) {
          setTimeout(() => {
            pauseAnimation();
            onComplete?.();
          }, stages.final.duration / speed);
        }
      }

      setProgress(progressValue);
    }, 50);
  };

  // 애니메이션 일시정지
  const pauseAnimation = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  // 애니메이션 리셋
  const resetAnimation = () => {
    pauseAnimation();
    setCurrentStage('original');
    setProgress(0);
  };

  // 속도 변경
  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);

    // 재생 중이면 재시작
    if (isPlaying) {
      pauseAnimation();
      setTimeout(() => startAnimation(), 100);
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentStageData = stages[currentStage];

  return (
    <div className={css.transformAnimation}>
      <div className={css.container}>
        <h2 className={css.title}>AI 변환 과정</h2>

        {/* 이미지 표시 영역 */}
        <div className={css.imageContainer}>
          <div className={css.imageWrapper}>
            <img
              src={currentStageData.image}
              alt={currentStageData.label}
              className={css.stageImage}
            />
            <div className={css.imageOverlay}>
              <span className={css.stageLabel}>{currentStageData.label}</span>
            </div>
          </div>
        </div>

        {/* 진행률 표시 */}
        <div className={css.progressSection}>
          <div className={css.progressBar}>
            <div
              className={css.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={css.progressText}>
            {Math.round(progress)}% 완료
          </span>
        </div>

        {/* 단계 표시 */}
        <div className={css.stagesIndicator}>
          {stageOrder.map((stage, index) => (
            <div
              key={stage}
              className={`${css.stageIndicator} ${currentStage === stage ? css.active : ''
                } ${stageOrder.indexOf(currentStage) > index ? css.completed : ''
                }`}
            >
              <div className={css.stageNumber}>{index + 1}</div>
              <span className={css.stageName}>{stages[stage].label}</span>
            </div>
          ))}
        </div>

        {/* 컨트롤 버튼 */}
        <div className={css.controls}>
          <button
            onClick={toggleAnimation}
            className={`${css.controlButton} ${css.playButton}`}
          >
            {isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}
          </button>

          <button
            onClick={resetAnimation}
            className={`${css.controlButton} ${css.resetButton}`}
          >
            🔄 리셋
          </button>

          {/* 속도 조절 */}

          <div className={css.speedControl}>
            <span className={css.speedLabel}>속도:</span>
            {[0.5, 1, 1.5, 2].map((speedOption) => (
              <button
                key={speedOption}
                onClick={() => changeSpeed(speedOption)}
                className={`${css.speedButton} ${speed === speedOption ? css.activeSpeed : ''
                  }`}
              >
                {speedOption}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
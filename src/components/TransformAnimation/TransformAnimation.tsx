import { useState, useEffect, useRef } from 'react';
import css from './TransformAnimation.module.css';
import { PLACEHOLDER_IMAGES, ANIMATION_STAGES } from '../../constants';

interface TransformAnimationProps {
  originalImage: string;
  transformedImage: string;
  style: string;
  onComplete?: () => void;
  autoStart?: boolean;
}

type AnimationStage = 'original' | 'processing1' | 'processing2' | 'final';

export default function TransformAnimation({
  originalImage,
  transformedImage,
  style,
  onComplete,
  autoStart = true,
}: TransformAnimationProps) {
  const [currentStage, setCurrentStage] = useState<AnimationStage>('original');
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<number | null>(null);

  // 단계별 이미지 정의
  const stages: Record<
    AnimationStage,
    { image: string; label: string; duration: number; description: string }
  > = {
    original: {
      image: originalImage,
      label: ANIMATION_STAGES.ORIGINAL.label,
      duration: ANIMATION_STAGES.ORIGINAL.duration,
      description: ANIMATION_STAGES.ORIGINAL.description,
    },
    processing1: {
      image: PLACEHOLDER_IMAGES.PROCESSING_1,
      label: ANIMATION_STAGES.EMOTION_ANALYSIS.label,
      duration: ANIMATION_STAGES.EMOTION_ANALYSIS.duration,
      description: ANIMATION_STAGES.EMOTION_ANALYSIS.description,
    },
    processing2: {
      image: PLACEHOLDER_IMAGES.PROCESSING_2,
      label: `${style} ${ANIMATION_STAGES.STYLE_PROCESSING.label}`,
      duration: ANIMATION_STAGES.STYLE_PROCESSING.duration,
      description: `${style} 스타일로 ${ANIMATION_STAGES.STYLE_PROCESSING.description}`,
    },
    final: {
      image: transformedImage,
      label: `${style} ${ANIMATION_STAGES.FINAL.label}`,
      duration: ANIMATION_STAGES.FINAL.duration,
      description: ANIMATION_STAGES.FINAL.description,
    },
  };

  const stageOrder: AnimationStage[] = [
    'original',
    'processing1',
    'processing2',
    'final',
  ];

  // 애니메이션 시작/정지
  const toggleAnimation = () => {
    if (isPlaying) {
      pauseAnimation();
    } else {
      startAnimation();
    }
  };

  // 애니메이션 시작 (간소화된 버전)
  const startAnimation = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 중단

    setIsPlaying(true);
    let currentIndex = stageOrder.indexOf(currentStage);
    let progressValue = progress;

    intervalRef.current = window.setInterval(() => {
      // 현재 스테이지의 지속시간 가져오기
      const currentStageName = stageOrder[currentIndex];
      const currentStageDuration = stages[currentStageName].duration;

      // 진행률을 간단하게 증가 (속도 반영)
      const incrementAmount = (100 / currentStageDuration) * 100 * speed;
      progressValue += incrementAmount;

      // 현재 스테이지 완료 시
      if (progressValue >= 100) {
        progressValue = 0;
        currentIndex = currentIndex + 1;

        // 다음 스테이지로 이동
        if (currentIndex < stageOrder.length) {
          const nextStage = stageOrder[currentIndex];
          setCurrentStage(nextStage);
        } else {
          // 모든 스테이지 완료
          pauseAnimation();
          onComplete?.();
          return;
        }
      }

      setProgress(progressValue);
    }, 100); // 100ms마다 업데이트 (더 이해하기 쉬운 간격)
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
  };

  // 컴포넌트 시작 시 자동 실행 (간소화된 버전)
  useEffect(() => {
    // 로딩 시간 시뮬레이션 후 애니메이션 시작
    const startTimer = setTimeout(() => {
      setIsLoading(false);

      if (autoStart) {
        // 0.5초 후 애니메이션 자동 시작
        setTimeout(() => {
          startAnimation();
        }, 500);
      }
    }, 1000); // 1초 로딩 시간

    // 컴포넌트 정리
    return () => {
      clearTimeout(startTimer);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);  // 속도 변경 시 처리 (간소화)
  useEffect(() => {
    // 속도가 변경되면 현재 재생 중인 경우에만 재시작
    if (isPlaying) {
      pauseAnimation();
      startAnimation();
    }
  }, [speed]);

  const currentStageData = stages[currentStage];

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className={css.transformAnimation}>
        <div className={css.container}>
          <h2 className={css.title}>AI 변환 준비 중</h2>
          <div className={css.loadingContainer}>
            <div className={css.loadingSpinner}></div>
            <p className={css.loadingText}>이미지를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <p className={css.stageDescription}>{currentStageData.description}</p>
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
          <span className={css.progressText}>{Math.round(progress)}% 완료</span>
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
            {[0.5, 1, 1.5, 2].map(speedOption => (
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

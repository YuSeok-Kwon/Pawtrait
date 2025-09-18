import { useState, useEffect } from 'react';
import css from './TransformAnimation.module.css';

interface TransformAnimationProps {
  originalImage: string;
  transformedImage: string;
  style: string;
  onComplete?: () => void;
}

export default function TransformAnimation({
  originalImage,
  transformedImage,
  style,
  onComplete
}: TransformAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [blendProgress, setBlendProgress] = useState(0);

  // 단계별 정보
  const steps = [
    {
      name: '원본 이미지',
      image: originalImage,
      showLoading: false,
      showBlending: false,
      description: '반려동물의 원본 사진입니다'
    },
    {
      name: '장면 분석 중...',
      image: originalImage,
      showLoading: true,
      showBlending: false,
      description: 'AI가 반려동물의 포즈와 배경을 분석하고 있어요'
    },
    {
      name: `${style} 스타일 변환 중...`,
      image: originalImage,
      showLoading: true,
      showBlending: true,
      description: `${style} 스타일로 변환하고 있어요`
    },
    {
      name: '변환 완료!',
      image: transformedImage,
      showLoading: false,
      showBlending: false,
      description: '스타일 변환이 완료되었습니다!'
    }
  ];

  // 애니메이션 시작
  const startAnimation = () => {
    if (isRunning) return;

    setIsRunning(true);
    setCurrentStep(0);
    setProgress(0);

    let step = 0;

    const runStep = () => {
      if (step < steps.length) {
        setCurrentStep(step);
        setProgress((step + 1) / steps.length * 100);

        // 변환 단계에서는 블렌딩 애니메이션 실행
        if (steps[step].showBlending) {
          let blendValue = 0;
          const blendInterval = setInterval(() => {
            blendValue += 0.3; // 천천히 블렌딩 (0.3%씩)
            setBlendProgress(blendValue);

            if (blendValue >= 100) {
              clearInterval(blendInterval);
              setTimeout(() => {
                step++;
                setBlendProgress(0);
                runStep();
              }, 1500); // 더 길게 대기
            }
          }, 150); // 느리게 업데이트 (150ms마다)
        } else {
          // 일반 단계는 2초 후 다음으로
          setTimeout(() => {
            step++;
            runStep();
          }, 2000);
        }
      } else {
        setIsRunning(false);
        if (onComplete) {
          onComplete();
        }
      }
    };

    runStep();
  };

  // 다시 시작
  const restartAnimation = () => {
    setCurrentStep(0);
    setProgress(0);
    setBlendProgress(0);
    setIsRunning(false);
  };

  // 자동 시작
  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={css.container}>
      <h2>AI 변환 과정</h2>
      <p>{style} 스타일로 변환하는 과정을 보여드려요</p>

      {/* 진행률 바 */}
      <div className={css.progressBar}>
        <div
          className={css.progressFill}
          style={{ width: `${progress}%` }}
        />
        <span className={css.progressText}>{Math.round(progress)}%</span>
      </div>

      {/* 현재 단계 */}
      <div className={css.stepArea}>
        <div className={css.imageBox}>
          {/* 블렌딩 효과가 있는 단계 */}
          {steps[currentStep].showBlending ? (
            <div className={css.blendingContainer}>
              <img
                src={originalImage}
                alt="원본"
                className={css.originalImage}
                style={{ opacity: (100 - blendProgress) / 100 }}
              />
              <img
                src={transformedImage}
                alt="변환된 이미지"
                className={css.transformedImage}
                style={{ opacity: blendProgress / 100 }}
              />
            </div>
          ) : (
            <img
              src={steps[currentStep].image}
              alt={steps[currentStep].name}
            />
          )}

          {/* 로딩 표시 */}
          {isRunning && steps[currentStep].showLoading && (
            <div className={css.simpleLoading}>
              <div className={css.loadingDot}></div>
              <div className={css.loadingDot}></div>
              <div className={css.loadingDot}></div>
              <span>변환 중...</span>
            </div>
          )}
        </div>

        <div className={css.stepInfo}>
          <h3>{steps[currentStep].name}</h3>
          <p>{steps[currentStep].description}</p>
        </div>
      </div>

      {/* 버튼들 */}
      <div className={css.buttons}>
        <button onClick={startAnimation} disabled={isRunning}>
          {isRunning ? '변환 중...' : '변환 시작'}
        </button>
        <button onClick={restartAnimation} disabled={isRunning}>
          처음부터
        </button>
      </div>

      {/* 단계 표시 */}
      <div className={css.stepList}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={index <= currentStep ? css.done : css.waiting}
          >
            <span>{index + 1}</span>
            <p>{step.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
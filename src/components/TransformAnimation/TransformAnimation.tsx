import { useState, useEffect } from 'react';
import css from './TransformAnimation.module.css';

interface TransformAnimationProps {
  originalImage: string;
  transformedImage: string;
  style: string;
  onComplete?: () => void; // 애니메이션 완료 시 호출될 함수
}

export default function TransformAnimation({
  originalImage,
  transformedImage,
  style,
  onComplete
}: TransformAnimationProps) {
  // 간단한 상태들
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 단계별 정보 (간단하게)
  const steps = [
    {
      name: '원본 이미지',
      image: originalImage,
      showLoading: false,
      description: '반려동물의 원본 사진입니다'
    },
    {
      name: '감정 분석 중...',
      image: originalImage,
      showLoading: true,
      description: 'AI가 반려동물의 감정을 분석하고 있어요'
    },
    {
      name: `${style} 스타일 변환 중...`,
      image: originalImage,
      showLoading: true,
      description: `${style} 스타일로 변환하고 있어요`
    },
    {
      name: '변환 완료!',
      image: transformedImage,
      showLoading: false,
      description: '스타일 변환이 완료되었습니다!'
    }
  ];  // 애니메이션 시작하기
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

        // 2초 기다린 후 다음 단계로
        setTimeout(() => {
          step++;
          runStep();
        }, 2000);
      } else {
        setIsRunning(false);
        // 애니메이션 완료되면 onComplete 호출
        if (onComplete) {
          onComplete();
        }
      }
    };

    runStep();
  };

  // 다시 시작하기
  const restartAnimation = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsRunning(false);
  };

  // 컴포넌트가 로드되면 자동으로 애니메이션 시작
  useEffect(() => {
    // 1초 후에 애니메이션 자동 시작
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
          <img
            src={steps[currentStep].image}
            alt={steps[currentStep].name}
          />
          {/* 간단한 로딩 표시 */}
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
        <button
          onClick={startAnimation}
          disabled={isRunning}
        >
          {isRunning ? '변환 중...' : '변환 시작'}
        </button>

        <button
          onClick={restartAnimation}
          disabled={isRunning}
        >
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

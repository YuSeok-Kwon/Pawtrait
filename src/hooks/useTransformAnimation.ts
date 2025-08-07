import { useState, useEffect, useRef, useCallback } from 'react';

type AnimationStage = 'original' | 'processing1' | 'processing2' | 'final';

interface UseTransformAnimationProps {
  stages: Record<AnimationStage, { duration: number }>;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useTransformAnimation({
  stages,
  onComplete,
  autoStart = false
}: UseTransformAnimationProps) {
  const [currentStage, setCurrentStage] = useState<AnimationStage>('original');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<number | null>(null);

  const stageOrder: AnimationStage[] = ['original', 'processing1', 'processing2', 'final'];

  const pauseAnimation = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startAnimation = useCallback(() => {
    if (intervalRef.current) return;
    
    setIsPlaying(true);
    let currentIndex = stageOrder.indexOf(currentStage);
    let progressValue = progress;

    intervalRef.current = window.setInterval(() => {
      const currentStageName = stageOrder[currentIndex];
      const stageDuration = stages[currentStageName].duration / speed;
      
      progressValue += (100 / stageDuration) * 50;

      if (progressValue >= 100) {
        progressValue = 0;
        currentIndex = (currentIndex + 1) % stageOrder.length;
        
        const nextStage = stageOrder[currentIndex];
        setCurrentStage(nextStage);
        
        if (nextStage === 'final' && currentIndex === stageOrder.length - 1) {
          setTimeout(() => {
            pauseAnimation();
            onComplete?.();
          }, stages.final.duration / speed);
        }
      }

      setProgress(progressValue);
    }, 50);
  }, [currentStage, progress, speed, stages, stageOrder, onComplete, pauseAnimation]);

  const toggleAnimation = useCallback(() => {
    if (isPlaying) {
      pauseAnimation();
    } else {
      startAnimation();
    }
  }, [isPlaying, startAnimation, pauseAnimation]);

  const resetAnimation = useCallback(() => {
    pauseAnimation();
    setCurrentStage('original');
    setProgress(0);
  }, [pauseAnimation]);

  const changeSpeed = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    
    if (isPlaying) {
      pauseAnimation();
      setTimeout(() => startAnimation(), 100);
    }
  }, [isPlaying, startAnimation, pauseAnimation]);

  // 자동 시작
  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }
  }, [autoStart, startAnimation]);

  // 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentStage,
    isPlaying,
    progress,
    speed,
    toggleAnimation,
    resetAnimation,
    changeSpeed,
    startAnimation,
    pauseAnimation
  };
}
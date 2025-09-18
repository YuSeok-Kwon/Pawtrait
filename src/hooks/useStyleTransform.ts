import { useEffect, useRef, useState } from 'react';
import { generateTransformedImageUrl } from '@/utils';
import { useImage } from '@/contexts/ImageContext';

interface UseStyleTransformOptions {
  style: string | null;
  sceneData?: string; // 향후 장면 분석 추가 대비
}

interface UseStyleTransformResult {
  transformedImage: string;
  isTransforming: boolean;
  isFallback: boolean;
  applyFilter: boolean;
  toggleFilter: () => void;
  sceneAnalysis: string; // 백엔드에서 전달된 장면 분석 결과
}

// 스타일 변환 API 호출 + 상태 관리 훅
export function useStyleTransform({ style, sceneData = 'sitting' }: UseStyleTransformOptions): UseStyleTransformResult {
  const { imageId, setTransformedPhoto } = useImage();
  const [transformedImage, setTransformedImage] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [detectedScene, setDetectedScene] = useState('');
  const startedRef = useRef(false);

  useEffect(() => {
    const run = async () => {
      if (!style || !imageId) return;
      if (startedRef.current) return;
      startedRef.current = true;
      setIsTransforming(true);
      setIsFallback(false);
      try {
        console.log('[useStyleTransform] 요청 시작', { style, imageId, sceneData });
        const res = await fetch('/api/images/process', {
          method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageId, style, sceneData })
        });
        console.log('[useStyleTransform] 상태:', res.status);
        let processedUrl = '';
        let fallbackFlag = false;
        let serverScene = '';
        if (res.ok) {
          const data = await res.json();
          processedUrl = data?.data?.processedUrl;
          if (!processedUrl) throw new Error('processedUrl 누락');
          if (data?.data?.isFallback) fallbackFlag = true;
          if (data?.data?.sceneAnalysis) serverScene = data.data.sceneAnalysis;
        } else {
          const txt = await res.text();
          console.warn('[useStyleTransform] 실패 응답:', txt);
          processedUrl = generateTransformedImageUrl(style);
          fallbackFlag = true;
        }
        setTransformedImage(processedUrl);
        setTransformedPhoto(processedUrl);
        setIsFallback(fallbackFlag);
        if (serverScene) setDetectedScene(serverScene);
      } catch (e) {
        console.error('[useStyleTransform] 오류:', e);
        const fb = generateTransformedImageUrl(style);
        setTransformedImage(fb);
        setTransformedPhoto(fb);
        setIsFallback(true);
      } finally {
        setIsTransforming(false);
      }
    };
    run();
    return () => {
      startedRef.current = false;
    };
  }, [style, imageId, sceneData, setTransformedPhoto]);

  const toggleFilter = () => setApplyFilter(p => !p);

  return { transformedImage, isTransforming, isFallback, applyFilter, toggleFilter, sceneAnalysis: detectedScene };
}

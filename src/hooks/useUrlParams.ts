import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { DEFAULT_STYLE } from '../constants';

/**
 * URL 파라미터를 쉽게 파싱하는 커스텀 훅
 */
export const useUrlParams = () => {
  const location = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const getParam = (key: string, defaultValue?: string): string => {
    return searchParams.get(key) || defaultValue || '';
  };

  const getStyleParam = (): string => {
    return getParam('style', DEFAULT_STYLE);
  };

  const getEmotionParam = (): string => {
    return getParam('emotion', 'happy');
  };

  const getAllParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  return {
    getParam,
    getStyleParam,
    getEmotionParam,
    getAllParams,
    searchParams,
  };
};

/**
 * URL 파라미터를 업데이트하는 유틸리티 함수
 */
export const updateUrlParams = (params: Record<string, string>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });
  
  return searchParams.toString();
};
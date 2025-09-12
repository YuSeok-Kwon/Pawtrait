import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import css from './SharePage.module.css';
import { PLACEHOLDER_IMAGES } from '../../constants';
import { useUrlParams } from '../../hooks/useUrlParams';
import { getSocialStyleInfo, getEmotionInfo } from '../../utils';

export default function SharePage() {
  const navigate = useNavigate();
  const { getStyleParam, getEmotionParam } = useUrlParams();
  const [copied, setCopied] = useState(false);

  // URL 파라미터에서 스타일과 이미지 정보 가져오기
  const style = getStyleParam();
  const emotion = getEmotionParam();

  const currentStyle = getSocialStyleInfo(style);
  const currentEmotion = getEmotionInfo(emotion);

  // 현재 URL 복사하기
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  // 소셜 미디어 공유 링크
  const shareLinks = {
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('우리 반려동물의 AI 초상화를 확인해보세요!')}`,
    instagram: `https://www.instagram.com/`,
  };

  return (
    <div className={css.sharePage}>
      <div className={css.container}>
        <h1 className={css.title}>작품 공유하기</h1>

        <div className={css.artworkCard}>
          <div className={css.imageSection}>
            <img
              src={PLACEHOLDER_IMAGES.AI_PORTRAIT}
              alt={`${currentStyle.name} 스타일 초상화`}
              className={css.artworkImage}
            />
          </div>

          <div className={css.infoSection}>
            <div
              className={css.styleTag}
              style={{ backgroundColor: currentStyle.color }}
            >
              {currentStyle.name} 스타일
            </div>

            <div className={css.emotionInfo}>
              <span className={css.emotionIcon}>{currentEmotion.icon}</span>
              <span className={css.emotionText}>
                감정: {currentEmotion.name}
              </span>
            </div>

            <p className={css.description}>
              AI가 분석한 반려동물의 감정을 바탕으로 {currentStyle.name}{' '}
              스타일의 초상화를 생성했습니다.
            </p>
          </div>
        </div>

        <div className={css.shareSection}>
          <h2 className={css.shareTitle}>공유하기</h2>

          <div className={css.urlShare}>
            <div className={css.urlContainer}>
              <input
                type='text'
                value={window.location.href}
                readOnly
                className={css.urlInput}
              />
              <Button
                onClick={copyToClipboard}
                theme="white"
                bordered
                size="small"
                className={copied ? css.copied : ''}
              >
                {copied ? '복사됨!' : '복사'}
              </Button>
            </div>
          </div>

          <div className={css.socialShare}>
            <h3 className={css.socialTitle}>소셜 미디어에 공유</h3>
            <div className={css.socialButtons}>
              <Button
                href={shareLinks.x}
                target='_blank'
                theme='x-social'
                size='medium'
                iconSrc='logo/X-logo.svg'
                iconAlt='X 로고'
              >
                Twitter
              </Button>
              <Button
                href={shareLinks.instagram}
                target='_blank'
                theme='instagram-social'
                size='medium'
                iconSrc='logo/Instagram-logo.svg'
                iconAlt='Instagram 로고'
              >
                Instagram
              </Button>
            </div>
          </div>
        </div>

        <div className={css.actionButtons}>
          <Button
            onClick={() => navigate('/result')}
            theme="white"
            bordered
            size="medium"
          >
            결과로 돌아가기
          </Button>
          <Button onClick={() => navigate('/upload')} theme="beige" size="medium">
            새 작품 만들기
          </Button>
          <Button onClick={() => navigate('/')} theme="white" bordered size="medium">
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
}

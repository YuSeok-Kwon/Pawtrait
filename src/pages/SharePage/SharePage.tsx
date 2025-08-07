import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import css from './SharePage.module.css';

export default function SharePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // URL 파라미터에서 스타일과 이미지 정보 가져오기
  const searchParams = new URLSearchParams(location.search);
  const style = searchParams.get('style') || 'ghibli';
  const emotion = searchParams.get('emotion') || 'happy';

  // 스타일별 정보
  const styleInfo = {
    ghibli: { name: '지브리', color: '#81C784' },
    pixel: { name: '픽셀아트', color: '#FF7043' },
    picasso: { name: '피카소', color: '#9C27B0' },
    pokemon: { name: '포켓몬', color: '#42A5F5' },
  };

  // 감정별 정보
  const emotionInfo = {
    happy: { name: '행복', icon: '😊', color: '#FFD700' },
    sad: { name: '슬픔', icon: '😢', color: '#87CEEB' },
    angry: { name: '화남', icon: '😠', color: '#FF6347' },
    surprised: { name: '놀람', icon: '😲', color: '#FF69B4' },
  };

  const currentStyle =
    styleInfo[style as keyof typeof styleInfo] || styleInfo.ghibli;
  const currentEmotion =
    emotionInfo[emotion as keyof typeof emotionInfo] || emotionInfo.happy;

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
              src='https://via.placeholder.com/400x400/e8e8e8/666?text=AI+Portrait'
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
              <button
                onClick={copyToClipboard}
                className={`${css.copyButton} ${copied ? css.copied : ''}`}
              >
                {copied ? '복사됨!' : '복사'}
              </button>
            </div>
          </div>

          <div className={css.socialShare}>
            <h3 className={css.socialTitle}>소셜 미디어에 공유</h3>
            <div className={css.socialButtons}>
              <a
                href={shareLinks.x}
                target='_blank'
                rel='noopener noreferrer'
                className={`${css.socialButton} ${css.x}`}
              >
                X
              </a>
              <a
                href={shareLinks.instagram}
                target='_blank'
                rel='noopener noreferrer'
                className={`${css.socialButton} ${css.instagram}`}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className={css.actionButtons}>
          <button
            onClick={() => navigate('/result')}
            className={css.backButton}
          >
            결과로 돌아가기
          </button>
          <button onClick={() => navigate('/upload')} className={css.activeBtn}>
            새 작품 만들기
          </button>
          <button onClick={() => navigate('/')} className={css.homeButton}>
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}

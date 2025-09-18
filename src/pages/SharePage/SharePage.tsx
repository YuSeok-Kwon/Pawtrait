import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import ImageComparison from '../../components/ImageComparison';
import { getSceneInfo, getStyleInfo } from '../../utils';
import { useUrlParams } from '../../hooks/useUrlParams';
import { useImage } from '../../contexts/ImageContext';
import css from './SharePage.module.css';

const SharePage: React.FC = () => {
  const navigate = useNavigate();
  const { transformedPhoto, currentPhoto } = useImage();
  const { getStyleParam, getSceneParam } = useUrlParams();

  const [isSharing, setIsSharing] = useState(false);

  const style = getStyleParam();
  const scene = getSceneParam();
  const currentStyle = getStyleInfo(style);
  const currentScene = getSceneInfo(scene);

  const shareData = {
    title: 'Pawtrait - AI 반려동물 포트레이트',
    text: `AI가 분석한 우리 아이의 ${currentScene.name} 장면을 ${currentStyle.name} 스타일로 변환했어요!`,
    url: window.location.href,
  };

  const handleSocialShare = async (platform: 'facebook' | 'twitter' | 'instagram' | 'kakao') => {
    setIsSharing(true);

    try {
      const shareUrl = window.location.href;
      const shareText = shareData.text;

      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '_blank'
          );
          break;
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank'
          );
          break;
        case 'instagram':
          // Instagram은 직접 공유가 어려워서 이미지 다운로드 안내
          alert('Instagram 공유를 위해 이미지를 저장한 후 Instagram 앱에서 업로드해주세요.');
          break;
        case 'kakao':
          // KakaoTalk 공유 (실제 구현시 Kakao SDK 필요)
          alert('카카오톡 공유 기능은 준비 중입니다.');
          break;
      }
    } catch (error) {
      console.error('공유 중 오류 발생:', error);
      alert('공유 중 오류가 발생했습니다.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownload = () => {
    if (transformedPhoto) {
      const link = document.createElement('a');
      link.href = transformedPhoto;
      link.download = `pawtrait-${style}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleNewTransform = () => {
    navigate('/upload');
  };

  return (
    <div className={css.container}>
      <div className={css.content}>
        <header className={css.header}>
          <h1 className={css.title}>공유하기</h1>
          <p className={css.subtitle}>
            멋진 작품을 친구들과 공유해보세요!
          </p>
        </header>

        <div className={css.imageSection}>
          <ImageComparison
            beforeImage={currentPhoto || ''}
            afterImage={transformedPhoto || ''}
            beforeLabel="원본"
            afterLabel="변환된 작품"
          />

          <div className={css.resultInfo}>
            <div className={css.infoItem}>
              <span className={css.sceneIcon}>{currentScene.icon}</span>
              <div className={css.infoText}>
                장면: {currentScene.name}
              </div>
            </div>
            <div className={css.infoItem}>
              <span className={css.styleIcon}>🎨</span>
              <div className={css.infoText}>
                스타일: {currentStyle.name}
              </div>
            </div>
          </div>
        </div>

        <div className={css.actionsSection}>
          <div className={css.shareButtons}>
            <h3 className={css.sectionTitle}>소셜 미디어 공유</h3>
            <div className={css.socialButtons}>
              <button
                className={css.socialButton}
                onClick={() => handleSocialShare('facebook')}
                disabled={isSharing}
              >
                <img src="/logo/facebook-logo.png" alt="Facebook" />
                Facebook
              </button>

              <button
                className={css.socialButton}
                onClick={() => handleSocialShare('twitter')}
                disabled={isSharing}
              >
                <img src="/logo/X-logo.svg" alt="Twitter" />
                Twitter
              </button>

              <button
                className={css.socialButton}
                onClick={() => handleSocialShare('instagram')}
                disabled={isSharing}
              >
                <img src="/logo/Instagram-logo.svg" alt="Instagram" />
                Instagram
              </button>

              <button
                className={css.socialButton}
                onClick={() => handleSocialShare('kakao')}
                disabled={isSharing}
              >
                <img src="/logo/KakaoTalk-logo.svg" alt="KakaoTalk" />
                KakaoTalk
              </button>
            </div>
          </div>

          <div className={css.downloadSection}>
            <h3 className={css.sectionTitle}>이미지 저장</h3>
            <Button
              onClick={handleDownload}
              size="large"
              disabled={!transformedPhoto}
            >
              이미지 다운로드
            </Button>
          </div>

          <div className={css.navigationSection}>
            <Button
              onClick={handleNewTransform}
              size="large"
            >
              새로운 작품 만들기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePage;
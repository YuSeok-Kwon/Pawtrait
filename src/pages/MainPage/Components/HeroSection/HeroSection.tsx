import css from './HeroSection.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '../../../../components/Button';

export default function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStartClick = () => {
    if (isAuthenticated) {
      // 로그인된 경우 업로드 페이지로 이동
      navigate('/upload');
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      navigate('/login');
    }
  };

  return (
    <div className={css.heroSection}>
      <img
        src='upload/main-image.png'
        alt='MainImg'
        className={css.heroImage}
      />
      <div className={css.heroContent}>
        <h1 className={css.heroTitle}>사진이 이야기가 되는 반려동물 초상화</h1>
        <p className={css.heroText}>
          한 장의 사진 속에 담긴 깊은 감정과 소중한 추억을
          <br /> 아름다운 작품으로 간직하세요
        </p>
        <Button
          onClick={handleStartClick}
          theme="white"
          bordered
          size="medium"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

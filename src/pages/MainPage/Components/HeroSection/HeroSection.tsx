import css from './HeroSection.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className={css.heroSection}>
      <img
        src='upload/main-image.png'
        alt='MainImg'
        className={css.heroImage}
      />
      <div className={css.heroContent}>
        <h1 className={css.heroTitle}>사랑하는 반려동물의 마음을 읽어주세요</h1>
        <p className={css.heroText}>
          한 장의 사진 속에 담긴 깊은 감정과 소중한 추억을
          <br /> 아름다운 작품으로 간직하세요
        </p>
        <Button
          onClick={() => navigate('/upload')}
          theme="beige"
          size="medium"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

import css from './PricingSection.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '../../../../components/Button';

export default function PricingSection() {
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
    <div className={css.PricingSection}>
      <h2 className={css.subTitle}>가격 정보</h2>
      <div className={css.pricingContent}>
        <div className={css.freePrice}>
          <h3>0 ₩</h3>
          <p className={css.priceDescription}>
            모든 기능을 완전히 <strong>무료</strong>로 이용하실 수 있습니다
          </p>
          <Button
            onClick={handleStartClick}
            theme="beige"
            size="medium"
          >
            무료로 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}

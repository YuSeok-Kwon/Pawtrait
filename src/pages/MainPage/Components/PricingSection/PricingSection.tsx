import css from './PricingSection.module.css';
import { useNavigate } from 'react-router-dom';

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <div className={css.PricingSection}>
      <h2 className={css.subTitle}>가격 정보</h2>
      <div className={css.pricingContent}>
        <div className={css.freePrice}>
          <h3>0 ₩</h3>
          <p className={css.priceDescription}>
            모든 기능을 완전히 <strong>무료</strong>로 이용하실 수 있습니다
          </p>
          <button onClick={() => navigate('/upload')} className='activeBtn'>
            지금 무료로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

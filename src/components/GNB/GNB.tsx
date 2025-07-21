import { useNavigate } from 'react-router-dom';
import css from './GNB.module.css';

function GNB() {
  const navigate = useNavigate();

  return (
    <div className={css.gnb}>
      <button onClick={() => navigate('/')} className={css.logo}>
        Pawtrait
      </button>
      <nav>
        <button onClick={() => navigate('/')} className={css.nav}>
          홈
        </button>
        <button onClick={() => navigate('/example')} className={css.nav}>
          예시
        </button>
        <button onClick={() => navigate('/how')} className={css.nav}>
          사용방법
        </button>
        <button onClick={() => navigate('/pricing')} className={css.nav}>
          가격
        </button>
        <button onClick={() => navigate('/upload')} className={css.activeBtn}>
          시작하기
        </button>
      </nav>
    </div>
  );
}

export default GNB;

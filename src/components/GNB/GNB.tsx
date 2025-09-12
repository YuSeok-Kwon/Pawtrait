import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import css from './GNB.module.css';

function GNB() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToSection = (sectionId: string) => {
    // 메인 페이지가 아닌 경우 먼저 메인 페이지로 이동
    if (window.location.pathname !== '/') {
      navigate('/');
      // 페이지 이동 후 스크롤 (약간의 지연 필요)
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // 이미 메인 페이지인 경우 바로 스크롤
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={css.gnb}>
      <button onClick={() => navigate('/')} className={css.logo}>
        Pawtrait
      </button>
      <nav>
        <button onClick={() => navigate('/')} className={css.nav}>
          홈
        </button>
        <button onClick={() => scrollToSection('example-section')} className={css.nav}>
          예시
        </button>
        <button onClick={() => scrollToSection('guide-section')} className={css.nav}>
          사용방법
        </button>
        <button onClick={() => scrollToSection('pricing-section')} className={css.nav}>
          가격
        </button>

        {isAuthenticated ? (
          <div className={css.userSection}>
            <span className={css.userName}>안녕하세요, {user?.name}님</span>
            <Button onClick={handleLogout} theme="white" bordered size="gnb">
              로그아웃
            </Button>
          </div>
        ) : (
          <Button onClick={() => navigate('/login')} theme="white" bordered size="gnb">
            로그인
          </Button>
        )}
      </nav>
    </div>
  );
}

export default GNB;

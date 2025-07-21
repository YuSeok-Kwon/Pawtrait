import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className='page'>
      {/* 헤더 */}
      <header className='header'>
        <div className='logo'>
          <h2>Pawtrait</h2>
        </div>

        <nav className='nav'>
          <Link to='/'>홈</Link>
          <Link to='/upload'>업로드</Link>
          <Link to='/share'>예시</Link>
        </nav>

        <Link to='/upload' className='start-button'>
          시작하기
        </Link>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='main-content'>
        <div className='content-center'>
          <h1 className='title'>반려동물을 지브리 스타일로 변환하세요</h1>

          <p className='description'>
            AI 기술로 당신의 소중한 반려동물을 아름다운 애니메이션 스타일로
            변환해드립니다.
          </p>

          <div className='buttons'>
            <Link to='/upload' className='primary-button'>
              시작하기
            </Link>
            <Link to='/share' className='secondary-button'>
              예시 보기
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

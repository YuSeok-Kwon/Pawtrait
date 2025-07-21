import { Link } from 'react-router-dom';

export function ResultPage() {
  return (
    <div className='page'>
      <header className='header'>
        <div className='logo'>
          <Link to='/'>
            <h2>Pawtrait</h2>
          </Link>
        </div>
      </header>

      <main className='main-content'>
        <div className='content-center'>
          <h1 className='title'>완성!</h1>
          <p className='description'>
            지브리 스타일로 변환된 반려동물 이미지입니다
          </p>

          <div className='result-image'>
            <p>여기에 변환된 이미지가 표시됩니다</p>
          </div>

          <div className='buttons'>
            <button className='primary-button'>다운로드</button>
            <Link to='/share' className='secondary-button'>
              공유하기
            </Link>
            <Link to='/' className='secondary-button'>
              다시 시작
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

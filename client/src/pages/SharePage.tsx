import { Link } from 'react-router-dom';

export function SharePage() {
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
          <h1 className='title'>작품 예시</h1>
          <p className='description'>
            다른 사용자들이 만든 멋진 작품들을 구경해보세요
          </p>

          <div className='gallery'>
            <div className='example-image'>예시 이미지 1</div>
            <div className='example-image'>예시 이미지 2</div>
            <div className='example-image'>예시 이미지 3</div>
          </div>

          <div className='buttons'>
            <Link to='/upload' className='primary-button'>
              나도 만들기
            </Link>
            <Link to='/' className='secondary-button'>
              홈으로
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Link } from 'react-router-dom';
import '../styles/simple.css';

export function MakeImgPage() {
  return (
    <div className="page">
      <header className="header">
        <div className="logo">
          <Link to="/">
            <h2>Pawtrait</h2>
          </Link>
        </div>
      </header>

      <main className="main-content">
        <div className="content-center">
          <h1 className="title">이미지 생성중</h1>
          <p className="description">
            AI가 멋진 지브리 스타일 이미지를 만들고 있어요!
          </p>

          <div className="loading">
            <p>잠시만 기다려주세요...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

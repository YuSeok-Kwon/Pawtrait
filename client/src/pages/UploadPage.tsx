import { Link } from 'react-router-dom';

export function UploadPage() {
  return (
    <div className='page'>
      {/* 헤더 */}
      <header className='header'>
        <div className='logo'>
          <Link to='/'>
            <h2>Pawtrait</h2>
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='main-content'>
        <div className='content-center'>
          <h1 className='title'>이미지 업로드</h1>

          <div className='upload-area'>
            <p>반려동물 사진을 업로드하세요</p>

            <div className='upload-box'>
              <p>여기를 클릭하거나 파일을 드래그하세요</p>
              <input type='file' name='image' accept='image/*' />
            </div>

            <div className='buttons'>
              <button className='primary-button'>업로드하기</button>
              <Link to='/' className='secondary-button'>
                취소
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import css from './UploadPage.module.css';
import Button from '../../components/Button'

function UploadPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className={css.uploadPage}>
        <div className={css.container}>
          <h1 className={css.title}>사진 업로드</h1>
          <p className={css.description}>반려동물의 사진을 업로드해주세요</p>

          <div className={css.uploadArea}>
            <div className={css.uploadBox}>
              <div className={css.uploadIcon}>📷</div>
              <p>클릭하거나 파일을 드래그해서 업로드하세요</p>
              <input type='file' className={css.fileInput} accept='image/*' />
            </div>
          </div>

          <div className={css.buttons}>
            <Button onClick={() => navigate('/')} text={"이전으로"} theme={"secondary"} />
            <Button onClick={() => navigate('/result')} text={"감정 분석 시작"} theme={"primary"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadPage;

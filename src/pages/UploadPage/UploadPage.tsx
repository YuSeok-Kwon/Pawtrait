import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './UploadPage.module.css';
import Button from '../../components/Button';
import { useImage } from '../../contexts/ImageContext';

function UploadPage() {
  const navigate = useNavigate();
  const { setCurrentPhoto, setImageId, clearPhoto } = useImage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 허용 타입 검사 (png / jpeg)
    const allowed = ['image/png', 'image/jpeg'];
    if (!allowed.includes(file.type)) {
      setError('PNG 또는 JPG 형식의 이미지만 업로드 가능합니다.');
      event.target.value = '';
      return;
    }

    // 파일 크기 체크 (10MB 제한)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('파일 크기가 너무 큽니다. 10MB 이하의 파일을 선택해주세요.');
      return;
    }

    setSelectedFile(file);
    setError('');

    // 선택한 파일을 미리보기로 보여주기 위해 URL로 변환합니다.
    // FileReader는 파일을 비동기적으로 읽는 객체입니다.
    const reader = new FileReader();

    // 파일 읽기가 성공적으로 완료되었을 때 실행될 함수
    reader.onload = (event: ProgressEvent<FileReader>) => {
      // event.target.result에 파일의 데이터 URL이 담겨 있습니다.
      const imageUrl = event.target?.result as string;

      if (imageUrl) {
        setPreviewUrl(imageUrl);
        // 다른 페이지에서도 이미지를 사용할 수 있도록 Context에 저장
        setCurrentPhoto(imageUrl);
      }
    };

    // 파일 읽기를 시작합니다. readAsDataURL은 파일을 Base64 인코딩된 문자열로 읽어옵니다.
    reader.readAsDataURL(file);
  };

  // 파일 크기를 사람이 읽기 쉬운 형태로 변환하는 함수
  // 예를 들어 1024 -> 1KB, 1024*1024 -> 1MB로 보여줍니다.
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const kb = 1024;
    const mb = kb * 1024;
    const gb = mb * 1024;

    if (bytes < kb) {
      return bytes + ' Bytes';
    } else if (bytes < mb) {
      // 소수점 없이 반올림하여 KB로 표시
      return Math.round(bytes / kb) + ' KB';
    } else if (bytes < gb) {
      // 소수점 없이 반올림하여 MB로 표시
      return Math.round(bytes / mb) + ' MB';
    } else {
      // 소수점 없이 반올림하여 GB로 표시
      return Math.round(bytes / gb) + ' GB';
    }
  };

  // 다른 사진을 선택하기 위해 현재 선택된 파일과 미리보기를 초기화하는 함수
  const handleClearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    clearPhoto();
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('먼저 이미지를 선택해주세요.');
      return;
    }
    setIsUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error('업로드 실패: ' + txt);
      }
      const result = await response.json();
      const uploaded = result.data;
      if (uploaded?.originalUrl) {
        setCurrentPhoto(uploaded.originalUrl); // 서버 경로 사용
      }
      if (uploaded?.id) {
        setImageId(uploaded.id);
      }
      navigate('/result');
    } catch (e: any) {
      console.error('업로드 실패', e);
      setError(e.message || '업로드 중 오류가 발생했습니다');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className={css.uploadPage}>
        <div className={css.container}>
          <h1 className={css.title}>사진 업로드</h1>
          <p className={css.description}>반려동물의 사진을 업로드해주세요</p>

          <div className={css.uploadArea}>
            {!previewUrl ? (
              <div className={css.uploadBox}>
                <div className={css.uploadIcon}>📷</div>
                <p>클릭하거나 파일을 드래그해서 업로드하세요</p>
                <input
                  type="file"
                  className={css.fileInput}
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
            ) : (
              <div className={css.previewContainer}>
                <div className={css.imagePreview}>
                  <img src={previewUrl} alt="업로드된 이미지" className={css.previewImage} />
                </div>
                <div className={css.fileInfo}>
                  <h3>업로드된 파일 정보</h3>
                  <div className={css.infoItem}>
                    <span className={css.infoLabel}>파일명:</span>
                    <span className={css.infoValue}>{selectedFile?.name}</span>
                  </div>
                  <div className={css.infoItem}>
                    <span className={css.infoLabel}>파일 크기:</span>
                    <span className={css.infoValue}>{selectedFile ? formatFileSize(selectedFile.size) : ''}</span>
                  </div>
                  <div className={css.infoItem}>
                    <span className={css.infoLabel}>업로드 장수:</span>
                    <span className={css.infoValue}>1장 (최대 1장까지 업로드 가능)</span>
                  </div>
                </div>
                <Button
                  onClick={handleClearSelection}
                  theme="white"
                  bordered
                  className={css.changeButton}
                >
                  다른 사진 선택
                </Button>
              </div>
            )}
          </div>

          <div className={css.buttons}>
            <Button onClick={() => navigate('/')} theme="white" bordered disabled={isUploading}>이전으로</Button>
            <Button onClick={handleUpload} theme="beige" disabled={!selectedFile || isUploading}>
              {isUploading ? <>업로드 중<span className={css.spinner}></span></> : '장면 분석 시작'}
            </Button>
          </div>
          {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default UploadPage;

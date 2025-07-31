import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import css from './ResultPage.module.css';

export default function ResultPage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  const styleOptions = [
    { id: 'ghibli', name: '지브리' },
    { id: 'pixel', name: '픽셀아트' },
    { id: 'picasso', name: '피카소' },
    { id: 'pokemon', name: '포켓몬' },
  ];

  // 감정 데이터 - 실제로는 API에서 받아올 데이터
  const emotionData = {
    emotion: 'happy',
    name: '행복',
    icon: '😊',
    score: 85,
    description: '반려동물이 매우 행복하고 편안한 상태입니다.',
    bgColor: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  };

  return (
    <>
      <div className={css.resultPage}>
        <div className={css.container}>
          <h1 className={css.title}>감정 분석 결과</h1>

          <div className={css.resultContent}>
            <div className={css.photoSection}>
              <h2 className={css.sectionTitle}>업로드한 사진</h2>
              <div className={css.photoContainer}>
                <img
                  src='https://via.placeholder.com/400x300/f5f5f5/999?text=Uploaded+Photo'
                  alt='업로드된 반려동물 사진'
                  className={css.uploadedPhoto}
                />
              </div>
            </div>

            <div className={css.analysisSection}>
              <h2 className={css.sectionTitle}>감정 분석 결과</h2>
              <div className={css.emotionResult}>
                <div
                  className={css.emotionCard}
                  style={{ background: emotionData.bgColor }}
                >
                  <div className={css.emotionIcon}>{emotionData.icon}</div>
                  <h3 className={css.emotionName}>{emotionData.name}</h3>
                  <div className={css.emotionScore}>{emotionData.score}%</div>
                  <p className={css.emotionDescription}>
                    {emotionData.description}
                  </p>
                </div>
              </div>
            </div>

            <div className={css.portraitSection}>
              <h2 className={css.sectionTitle}>AI 생성 초상화</h2>
              <div className={css.portraitContainer}>
                <img
                  src='https://via.placeholder.com/400x400/e8e8e8/666?text=AI+Portrait'
                  alt='AI 생성 반려동물 초상화'
                  className={css.portraitImage}
                />
              </div>

              <div className={css.actionSection}>
                <div className={css.styleSelection}>
                  <h3 className={css.styleTitle}>다른 스타일로 변환하기</h3>
                  <div className={css.styleOptions}>
                    {styleOptions.map(style => (
                      <button
                        key={style.id}
                        className={`${css.styleOption} ${
                          selectedStyle === style.id ? css.selected : ''
                        }`}
                        onClick={() => setSelectedStyle(style.id)}
                      >
                        <span>{style.name}</span>
                      </button>
                    ))}
                  </div>

                  {selectedStyle && (
                    <div className={css.transformButton}>
                      <button
                        className='activeBtn'
                        onClick={() =>
                          navigate(`/transform?style=${selectedStyle}`)
                        }
                      >
                        선택한 스타일로 변환하기
                      </button>
                    </div>
                  )}
                </div>

                <div className={css.downloadSection}>
                  <button className='activeBtn'>초상화 다운로드</button>
                </div>
              </div>
            </div>
          </div>

          <div className={css.buttons}>
            <button
              onClick={() => navigate('/upload')}
              className={css.backButton}
            >
              다시 업로드
            </button>
            <button onClick={() => navigate('/')} className={css.homeButton}>
              홈으로
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

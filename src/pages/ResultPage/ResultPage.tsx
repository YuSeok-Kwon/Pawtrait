import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import css from './ResultPage.module.css';

function ResultPage() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  const styleOptions = [
    { id: 'ghibli', name: '지브리' },
    { id: 'pixel', name: '픽셀아트' },
    { id: 'picasso', name: '피카소' },
    { id: 'pokemon', name: '포켓몬' },
  ];

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
                  src='/api/placeholder/400/300'
                  alt='업로드된 반려동물 사진'
                  className={css.uploadedPhoto}
                />
              </div>
            </div>

            <div className={css.analysisSection}>
              <h2 className={css.sectionTitle}>감정 분석 결과</h2>
              <div className={css.emotionResult}>
                <div className={css.emotionCard}>
                  <div className={css.emotionIcon}>😊</div>
                  <h3 className={css.emotionName}>행복</h3>
                  <div className={css.emotionScore}>85%</div>
                  <p className={css.emotionDescription}>
                    반려동물이 매우 행복하고 편안한 상태입니다.
                  </p>
                </div>
              </div>
            </div>

            <div className={css.portraitSection}>
              <h2 className={css.sectionTitle}>AI 생성 초상화</h2>
              <div className={css.portraitContainer}>
                <img
                  src='/api/placeholder/400/400'
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

export default ResultPage;

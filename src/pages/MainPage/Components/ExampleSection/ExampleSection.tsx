import css from './ExampleSection.module.css';

export default function ExampleSection() {
  return (
    <div className={css.exampleSection}>
      <div className={css.exampleContent}>
        <h2 className={css.subTitle}>
          우리는 반려동물의 감정을 분석하고,
          <br />
          클래식 페인팅부터 모던 디지털 아트까지 다양한 아트 스타일로 사진을
          변환합니다.
        </h2>
        <div className={css.exampleDiv}>
          <img
            src='upload/pocketmon-style.png'
            alt='감정 분석 예시'
            className={css.exampleImg}
          />
          <img
            src='upload/picaso-style.png'
            alt='픽셀 아트 스타일'
            className={css.exampleImg}
          />
          <img
            src='upload/zhibli-style.png'
            alt='지브리 스타일'
            className={css.exampleImg}
          />
        </div>
      </div>
    </div>
  );
}

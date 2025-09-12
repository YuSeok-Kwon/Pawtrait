import css from './ExampleSection.module.css';

export default function ExampleSection() {
  return (
    <div className={css.exampleSection}>
      <div className={css.exampleContent}>
        <h2 className={css.subTitle}>
          반려동물의 감정을 읽어내고,
          <br />
          클래식부터 모던 아트까지 다양한 스타일로
          특별한 작품을 만들어드립니다.
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

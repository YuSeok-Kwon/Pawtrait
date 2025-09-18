import css from './ExampleSection.module.css';

export default function ExampleSection() {
  return (
    <div className={css.exampleSection}>
      <div className={css.exampleContent}>
        <h2 className={css.subTitle}>
          반려동물의 포즈와 배경을 분석하고,
          <br />
          애니메이션부터 아트까지 다양한 스타일로
          특별한 작품을 만들어드립니다.
        </h2>
        <div className={css.exampleDiv}>
          <img
            src='/upload/attack-on-titan-style.png'
            alt='진격의 거인 스타일'
            className={css.exampleImg}
          />
          <img
            src='/upload/demon-slayer-kimetsu-no-yaiba-style.png'
            alt='귀멸의 칼날 스타일'
            className={css.exampleImg}
          />
          <img
            src='/upload/picasso-style.png'
            alt='피카소 스타일'
            className={css.exampleImg}
          />
          <img
            src='/upload/cyberpunk-style.png'
            alt='사이버펑크 스타일'
            className={css.exampleImg}
          />
        </div>
      </div>
    </div>
  );
}

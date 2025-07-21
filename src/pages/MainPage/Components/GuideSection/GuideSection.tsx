import css from './GuideSection.module.css';

export default function GuideSection() {
  return (
    <div className={css.GuideSection}>
      <h2 className={css.subTitle}>어떻게 사용하나요?</h2>
      <div className={css.guideSteps}>
        <div className={css.step}>
          <div className={css.stepNumber}>1</div>
          <h3>사진 업로드</h3>
          <p>반려동물의 사진을 업로드해주세요</p>
        </div>
        <div className={css.step}>
          <div className={css.stepNumber}>2</div>
          <h3>감정 분석</h3>
          <p>AI가 반려동물의 감정을 자동으로 분석합니다</p>
        </div>
        <div className={css.step}>
          <div className={css.stepNumber}>3</div>
          <h3>스타일 선택</h3>
          <p>원하는 아트 스타일을 선택하세요</p>
        </div>
        <div className={css.step}>
          <div className={css.stepNumber}>4</div>
          <h3>작품 완성</h3>
          <p>특별한 초상화가 완성됩니다</p>
        </div>
      </div>
    </div>
  );
}

import css from '../ResultPage.module.css';
import { EmotionData } from '../../../constants';

interface EmotionAnalysisProps {
    emotionData: EmotionData;
}

export default function EmotionAnalysis({ emotionData }: EmotionAnalysisProps) {
    return (
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
    );
}
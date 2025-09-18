import css from '../ResultPage.module.css';
import { SceneData } from '../../../constants';

interface SceneAnalysisProps {
    sceneData: SceneData;
}

export default function SceneAnalysis({ sceneData }: SceneAnalysisProps) {
    return (
        <div className={css.analysisSection}>
            <h2 className={css.sectionTitle}>장면 분석 결과</h2>
            <div className={css.sceneResult}>
                <div
                    className={css.sceneCard}
                    style={{ background: sceneData.bgColor }}
                >
                    <div className={css.sceneIcon}>{sceneData.icon}</div>
                    <h3 className={css.sceneName}>{sceneData.name}</h3>
                    <div className={css.sceneConfidence}>{sceneData.confidence}%</div>
                    <p className={css.sceneDescription}>
                        {sceneData.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
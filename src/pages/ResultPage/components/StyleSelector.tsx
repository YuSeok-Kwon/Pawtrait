import css from '../ResultPage.module.css';
import Button from '../../../components/Button';
import { STYLE_OPTIONS, PLACEHOLDER_IMAGES } from '../../../constants';
import { isValidStyleId } from '../../../utils';

interface StyleSelectorProps {
    selectedStyle: string;
    onStyleSelect: (styleId: string) => void;
    onTransform: () => void;
    portraitSrc?: string;
}

export default function StyleSelector({
    selectedStyle,
    onStyleSelect,
    onTransform,
    portraitSrc = PLACEHOLDER_IMAGES.AI_PORTRAIT
}: StyleSelectorProps) {
    return (
        <div className={css.portraitSection}>
            <h2 className={css.sectionTitle}>AI 생성 초상화</h2>
            <div className={css.portraitContainer}>
                <img
                    src={portraitSrc}
                    alt='AI 생성 반려동물 초상화'
                    className={css.portraitImage}
                />
            </div>

            <div className={css.actionSection}>
                <div className={css.styleSelection}>
                    <h3 className={css.styleTitle}>다른 스타일로 변환하기</h3>
                    <div className={css.styleOptions}>
                        {STYLE_OPTIONS.map((style, index) => {
                            console.log(`CSS -> ${css[style.id]}`, style.id)

                            return (
                                <Button
                                    key={index}
                                    onClick={() => onStyleSelect(style.id)}
                                    theme={style.id === 'attack_titan' ? 'attack_titan' :
                                        style.id === 'demon_slayer' ? 'demon_slayer' :
                                            style.id === 'one_piece' ? 'one_piece' :
                                                style.id === 'picasso' ? 'picasso' :
                                                    style.id === 'pixel' ? 'pixel' :
                                                        style.id === 'lego' ? 'lego' :
                                                            style.id === 'cyberpunk' ? 'cyberpunk' : 'beige'}
                                    size="medium"
                                    imageSrc={style.imageSrc}
                                    imageAlt={`${style.name} 스타일 미리보기`}
                                >
                                    {style.name}
                                </Button>
                            )
                        })}
                    </div>

                    {selectedStyle && isValidStyleId(selectedStyle) && (
                        <div className={css.transformButton}>
                            <Button
                                theme={selectedStyle === 'attack_titan' ? 'attack_titan' :
                                    selectedStyle === 'demon_slayer' ? 'demon_slayer' :
                                        selectedStyle === 'one_piece' ? 'one_piece' :
                                            selectedStyle === 'picasso' ? 'picasso' :
                                                selectedStyle === 'pixel' ? 'pixel' :
                                                    selectedStyle === 'lego' ? 'lego' :
                                                        selectedStyle === 'cyberpunk' ? 'cyberpunk' : 'beige'}
                                size="large"
                                onClick={onTransform}
                            >
                                선택한 스타일로 변환하기
                            </Button>
                        </div>
                    )}
                </div>

                <div className={css.downloadSection}>
                    <Button theme="beige" size="medium">초상화 다운로드</Button>
                </div>
            </div>
        </div>
    );
}
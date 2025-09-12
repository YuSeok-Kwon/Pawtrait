import Button from '../../../components/Button';
import css from '../ResultPage.module.css';

interface ActionButtonsProps {
    onShare: () => void;
    onRetakePhoto: () => void;
    onGoHome: () => void;
}

export default function ActionButtons({ onShare, onRetakePhoto, onGoHome }: ActionButtonsProps) {
    return (
        <div className={css.buttons}>
            <Button theme="white" bordered size="medium" onClick={onShare}>
                작품 공유하기
            </Button>
            <Button onClick={onRetakePhoto} theme="white" bordered size="medium">
                다시 업로드
            </Button>
            <Button onClick={onGoHome} theme="beige" size="medium">
                홈으로
            </Button>
        </div>
    );
}
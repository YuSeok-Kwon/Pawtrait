import css from '../ResultPage.module.css';
import { PLACEHOLDER_IMAGES } from '../../../constants';

interface PhotoDisplayProps {
    photoSrc?: string;
}

export default function PhotoDisplay({ photoSrc = PLACEHOLDER_IMAGES.UPLOADED_PHOTO }: PhotoDisplayProps) {
    return (
        <div className={css.photoSection}>
            <h2 className={css.sectionTitle}>업로드한 사진</h2>
            <div className={css.photoContainer}>
                <img
                    src={photoSrc}
                    alt='업로드된 반려동물 사진'
                    className={css.uploadedPhoto}
                />
            </div>
        </div>
    );
}
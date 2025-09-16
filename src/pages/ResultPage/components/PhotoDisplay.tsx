import { useState } from 'react';
import css from '../ResultPage.module.css';
import { PLACEHOLDER_IMAGES } from '../../../constants';
import ImageComparison from '@/components/ImageComparison';
import { useImage } from '../../../contexts/ImageContext';

interface PhotoDisplayProps {
    transformedSrc?: string;
}

export default function PhotoDisplay({
    transformedSrc = '/upload/zhibli-style.png'
}: PhotoDisplayProps) {
    const { currentPhoto } = useImage();
    const [viewMode, setViewMode] = useState<'single' | 'comparison'>('single');

    // 업로드된 이미지가 있으면 그것을 사용하고, 없으면 기본 이미지(플레이스홀더)를 보여줍니다.
    const photoSrc = currentPhoto || PLACEHOLDER_IMAGES.UPLOADED_PHOTO;

    return (
        <div className={css.photoSection}>
            <div className={css.sectionHeader}>
                <h2 className={css.sectionTitle}>이미지 미리보기</h2>
                <div className={css.viewToggle}>
                    <button
                        className={`${css.toggleButton} ${viewMode === 'single' ? css.active : ''}`}
                        onClick={() => setViewMode('single')}
                    >
                        원본
                    </button>
                    <button
                        className={`${css.toggleButton} ${viewMode === 'comparison' ? css.active : ''}`}
                        onClick={() => setViewMode('comparison')}
                    >
                        변환 비교
                    </button>
                </div>
            </div>

            <div className={css.photoContainer}>
                {viewMode === 'single' ? (
                    <img
                        src={photoSrc}
                        alt='업로드된 반려동물 사진'
                        className={css.uploadedPhoto}
                    />
                ) : (
                    <ImageComparison
                        beforeImage={photoSrc}
                        afterImage={transformedSrc}
                        beforeLabel="원본"
                        afterLabel="변환 후"
                    />
                )}
            </div>
        </div>
    );
}
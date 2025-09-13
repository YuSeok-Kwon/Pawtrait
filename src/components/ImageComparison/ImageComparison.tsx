import React, { useState } from 'react';
import css from './ImageComparison.module.css';

// 이미지 비교 컴포넌트 props
interface ImageComparisonProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

const ImageComparison = ({
    beforeImage,
    afterImage,
    beforeLabel = '변환 전',
    afterLabel = '변환 후'
}: ImageComparisonProps) => {
    // 슬라이더 위치 상태 (기본값: 50%)
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    // 마우스 위치 계산 함수 - 처음엔 복잡하게 생각했는데 이렇게 하면 됨
    const getMousePosition = (event: React.MouseEvent, container: HTMLElement) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        // 0과 100 사이로 제한하기
        if (percentage < 0) return 0;
        if (percentage > 100) return 100;
        return percentage;
    };

    // 마우스 클릭할 때
    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        const container = event.currentTarget as HTMLElement;
        const newPosition = getMousePosition(event, container);
        setSliderPosition(newPosition);
    };

    // 마우스 움직일 때 
    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging) {
            const container = event.currentTarget as HTMLElement;
            const newPosition = getMousePosition(event, container);
            setSliderPosition(newPosition);
        }
    };

    // 마우스 놓을 때
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // 나중에 마우스가 영역 밖으로 나가도 드래그 되도록 개선 예정

    return (
        <div className={css.container}>
            {/* 이미지 영역 */}
            <div
                className={css.imageContainer}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >

                {/* 원본 이미지 */}
                <div className={css.beforeImage}>
                    <img
                        src={beforeImage}
                        alt="변환 전 이미지"
                        className={css.image}
                    />
                    {/* 슬라이더가 20% 이상이고 라벨이 있을 때만 보이게 */}
                    {sliderPosition > 20 && beforeLabel && (
                        <div className={`${css.label} ${css.beforeLabel}`}>{beforeLabel}</div>
                    )}
                </div>

                {/* 변환된 이미지 - clipPath로 일부만 보이게 함 */}
                <div
                    className={css.afterImage}
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={afterImage}
                        alt="변환 후 이미지"
                        className={css.image}
                    />
                    {/* 슬라이더가 80% 미만이고 라벨이 있을 때만 보이게 */}
                    {sliderPosition < 80 && afterLabel && (
                        <div className={`${css.label} ${css.afterLabel}`}>{afterLabel}</div>
                    )}
                </div>

                {/* 드래그 슬라이더 핸들 */}
                <div
                    className={`${css.slider} ${isDragging ? css.dragging : ''}`}
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className={css.sliderLine}></div>
                    <div className={css.sliderHandle}>
                        <div className={css.sliderArrows}>
                            <span>‹</span>
                            <span>›</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 사용법 안내 */}
            <p className={css.instructions}>
                가운데 선을 좌우로 드래그해서 비교해보세요
            </p>
        </div>
    );
};

export default ImageComparison;

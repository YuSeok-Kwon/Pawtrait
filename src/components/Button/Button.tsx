import React from "react";
import styles from "./Button.module.css";

// 프로젝트에서 사용하는 모든 테마 (주석으로 용도 설명)
export type ButtonTheme =
    | 'beige'              // 기본 메인 액션 버튼
    | 'white'              // 보조 액션 버튼
    | 'ghibli'             // 지브리 스타일 변환용
    | 'pokemon'            // 포켓몬 스타일 변환용  
    | 'pixel'              // 픽셀아트 스타일 변환용
    | 'picasso'            // 피카소 스타일 변환용
    | 'x-social'           // X(트위터) 공유용
    | 'instagram-social';  // 인스타그램 공유용
export type ButtonSize = 'small' | 'medium' | 'large' | 'gnb';

// 필수 Props + 이미지 기능 (스타일 선택용)
interface ButtonProps {
    theme?: ButtonTheme;
    size?: ButtonSize;
    bordered?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void; // 간소화된 onClick
    className?: string;
    // 스타일 선택 버튼용 이미지 (선택사항)
    imageSrc?: string;     // 이미지 경로
    imageAlt?: string;     // 이미지 설명
}

const Button: React.FC<ButtonProps> = ({
    theme = 'beige',
    size = 'medium',
    bordered = false,
    disabled = false,
    children,
    className = "",
    onClick,
    imageSrc,
    imageAlt,
}) => {
    // 간단한 클래스 조합 (이해하기 쉬운 방식)
    let buttonClasses = `${styles.button} ${styles[theme]} ${styles[size]}`;

    // 이미지가 있으면 이미지용 스타일 추가
    if (imageSrc) {
        buttonClasses += ` ${styles.withImage}`;
    }
    if (bordered) {
        buttonClasses += ` ${styles.bordered}`;
    }
    if (disabled) {
        buttonClasses += ` ${styles.disabled}`;
    }
    if (className) {
        buttonClasses += ` ${className}`;
    }

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {/* 이미지가 있으면 이미지 표시 */}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt || ''}
                    className={styles.buttonImage}
                />
            )}
            {children}
        </button>
    );
};

export default Button;

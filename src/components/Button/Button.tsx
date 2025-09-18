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
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    target?: string;
    rel?: string;
    // 스타일 선택 버튼용 이미지 (선택사항)
    imageSrc?: string;     // 이미지 경로
    imageAlt?: string;     // 이미지 설명
    // 소셜 공유 아이콘 alias
    iconSrc?: string;
    iconAlt?: string;
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
    iconSrc,
    iconAlt,
    type = 'button',
    href,
    target,
    rel,
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

    const finalImageSrc = imageSrc || iconSrc;
    const finalImageAlt = imageAlt || iconAlt || '';

    if (href) {
        return (
            <a
                className={buttonClasses}
                href={href}
                target={target}
                rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault();
                        return;
                    }
                    onClick?.();
                }}
            >
                {finalImageSrc && (
                    <img
                        src={finalImageSrc}
                        alt={finalImageAlt}
                        className={styles.buttonImage}
                    />
                )}
                {children}
            </a>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {finalImageSrc && (
                <img
                    src={finalImageSrc}
                    alt={finalImageAlt}
                    className={styles.buttonImage}
                />
            )}
            {children}
        </button>
    );
};

export default Button;

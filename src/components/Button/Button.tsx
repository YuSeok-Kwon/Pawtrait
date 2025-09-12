import React from "react";
import styles from "./Button.module.css";

export type ButtonTheme = 'beige' | 'white' | 'ghibli' | 'pokemon' | 'pixel' | 'picasso' | 'x-social' | 'instagram-social';
export type ButtonSize = 'small' | 'gnb' | 'medium' | 'large';

interface ButtonProps {
    theme?: ButtonTheme;
    size?: ButtonSize;
    bordered?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    href?: string;
    target?: string;
    type?: 'button' | 'submit' | 'reset';
    imageSrc?: string;
    imageAlt?: string;
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
    href,
    target,
    type = 'button',
    imageSrc,
    imageAlt,
    iconSrc,
    iconAlt,
}) => {
    const buttonClasses = [
        styles.button,
        styles[theme],
        styles[size],
        imageSrc ? styles.withImage : '',
        bordered ? styles.bordered : '',
        disabled ? styles.disabled : '',
        className
    ].filter(Boolean).join(' ');

    const buttonContent = (
        <>
            {iconSrc && (
                <img
                    src={iconSrc}
                    alt={iconAlt || ''}
                    className={styles.buttonIcon}
                />
            )}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt || ''}
                    className={styles.buttonImage}
                />
            )}
            <span className={styles.buttonText}>{children}</span>
        </>
    ); if (href && !disabled) {
        return (
            <a
                href={href}
                target={target}
                className={buttonClasses}
                onClick={onClick as any}
            >
                {buttonContent}
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
            {buttonContent}
        </button>
    );
};

export default Button;

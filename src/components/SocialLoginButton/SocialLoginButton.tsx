import React from 'react';
import { SocialProvider } from '@/utils/socialLogin';
import styles from './SocialLoginButton.module.css';

interface SocialLoginButtonProps {
    provider: SocialProvider;
    onClick: (provider: SocialProvider) => void;
    disabled?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
    provider,
    onClick,
    disabled = false
}) => {
    const getProviderConfig = (provider: SocialProvider) => {
        switch (provider) {
            case 'kakao':
                return {
                    name: '카카오',
                    backgroundColor: '#ffe812',
                    textColor: '#000000',
                    iconSrc: '/logo/KakaoTalk-logo.svg'
                };
            case 'google':
                return {
                    name: '구글',
                    backgroundColor: '#ffffff',
                    textColor: '#757575',
                    iconSrc: '/logo/Google-logo.png'
                };
        }
    };

    const config = getProviderConfig(provider);

    return (
        <button
            type="button"
            className={`${styles.socialButton} ${styles[provider]}`}
            onClick={() => onClick(provider)}
            disabled={disabled}
            style={{
                backgroundColor: config.backgroundColor,
                color: config.textColor,
            }}
        >
            <img
                src={config.iconSrc}
                alt={`${config.name} 로고`}
                className={styles.icon}
            />
            <span className={styles.text}>
                {config.name}로 로그인
            </span>
        </button>
    );
};

export default SocialLoginButton;
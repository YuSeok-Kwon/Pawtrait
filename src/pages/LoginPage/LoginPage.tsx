import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import SocialLoginButton from '@/components/SocialLoginButton';
import { SocialProvider } from '@/utils/socialLogin';
import styles from './LoginPage.module.css';

interface LoginForm {
    email: string;
    password: string;
}

interface LoginErrors {
    email?: string;
    password?: string;
    general?: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState<LoginForm>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

    const validateForm = (): LoginErrors => {
        const newErrors: LoginErrors = {};

        if (!form.email) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = '올바른 이메일 형식을 입력해주세요.';
        }

        if (!form.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (form.password.length < 6) {
            newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        // 에러 메시지 클리어
        if (errors[name as keyof LoginErrors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            await login(form.email, form.password);

            // 성공 시 메인 페이지로 리디렉트
            navigate('/');

        } catch (error) {
            setErrors({ general: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: SocialProvider) => {
        setSocialLoading(provider);
        setErrors({});

        try {
            // 실제 소셜 로그인 구현 시에는 팝업을 통한 OAuth 플로우 진행
            // 현재는 임시로 테스트 데이터 생성
            console.log(`${provider} 소셜 로그인 시작`);

            // 임시 지연 (실제 OAuth 플로우 시뮬레이션)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // TODO: 실제 구현에서는 startSocialLogin과 exchangeCodeForUserInfo 사용
            // const code = await startSocialLogin(provider);
            // const userInfo = await exchangeCodeForUserInfo(provider, code);

            // 임시 소셜 로그인 성공 처리
            // 실제 구현 시 사용자 정보 확보 후 AuthContext 처리 예정

            // AuthContext에 소셜 로그인 함수가 있다면 사용
            // await socialLogin(provider, mockUser);

            alert(`${provider} 로그인 성공!`);
            navigate('/');

        } catch (error) {
            console.error('소셜 로그인 실패:', error);
            setErrors({
                general: `${provider} 로그인에 실패했습니다. 다시 시도해주세요.`
            });
        } finally {
            setSocialLoading(null);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>로그인</h1>
                        <p className={styles.subtitle}>Pawtrait에 오신 것을 환영합니다</p>
                    </div>

                    <div className={styles.socialLoginSection}>
                        <SocialLoginButton
                            provider="kakao"
                            onClick={handleSocialLogin}
                            disabled={socialLoading !== null}
                        />
                        <SocialLoginButton
                            provider="google"
                            onClick={handleSocialLogin}
                            disabled={socialLoading !== null}
                        />
                    </div>

                    <div className={styles.divider}>
                        <span className={styles.dividerText}>또는</span>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {errors.general && (
                            <div className={styles.generalError}>{errors.general}</div>
                        )}

                        <Input
                            type="email"
                            name="email"
                            label="이메일"
                            placeholder="이메일을 입력해주세요"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            variant="auth"
                        />

                        <Input
                            type="password"
                            name="password"
                            label="비밀번호"
                            placeholder="비밀번호를 입력해주세요"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                            variant="auth"
                        />

                        <Button
                            type="submit"
                            theme="beige"
                            size="large"
                            disabled={isLoading || socialLoading !== null}
                            className={styles.loginButton}
                        >
                            {isLoading ? '로그인 중...' : '로그인'}
                        </Button>
                    </form>

                    <div className={styles.footer}>
                        <p className={styles.signupText}>
                            계정이 없으신가요?{' '}
                            <Link to="/signup" className={styles.signupLink}>
                                회원가입
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './EmailVerificationPage.module.css';

interface VerificationForm {
    code: string;
}

interface VerificationErrors {
    code?: string;
    general?: string;
}

const EmailVerificationPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    const [form, setForm] = useState<VerificationForm>({
        code: '',
    });

    const [errors, setErrors] = useState<VerificationErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5분 = 300초
    const [verificationSent, setVerificationSent] = useState(false);

    // 이메일이 없으면 회원가입 페이지로 리디렉트
    useEffect(() => {
        if (!email) {
            navigate('/signup');
            return;
        }
        setVerificationSent(true);
    }, [email, navigate]);

    // 카운트다운 타이머
    useEffect(() => {
        if (countdown > 0 && verificationSent) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, verificationSent]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const validateForm = (): VerificationErrors => {
        const newErrors: VerificationErrors = {};

        if (!form.code.trim()) {
            newErrors.code = '인증 코드를 입력해주세요.';
        } else if (form.code.trim().length !== 6) {
            newErrors.code = '인증 코드는 6자리입니다.';
        } else if (!/^\d{6}$/.test(form.code.trim())) {
            newErrors.code = '인증 코드는 숫자만 입력 가능합니다.';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // 숫자만 입력 허용, 최대 6자리
        if (name === 'code') {
            const numericValue = value.replace(/\D/g, '').slice(0, 6);
            setForm(prev => ({ ...prev, [name]: numericValue }));
        }

        // 에러 메시지 클리어
        if (errors[name as keyof VerificationErrors]) {
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
            // TODO: 실제 이메일 인증 API 연동
            console.log('이메일 인증 시도:', { email, code: form.code });

            // 임시 지연 (실제 API 호출 시뮬레이션)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // 임시 인증 성공 처리 (실제로는 서버에서 코드 검증)
            if (form.code === '123456') {
                alert('이메일 인증이 완료되었습니다! 로그인해주세요.');
                navigate('/login');
            } else {
                setErrors({ code: '인증 코드가 올바르지 않습니다.' });
            }

        } catch (error) {
            setErrors({ general: '인증 처리 중 오류가 발생했습니다. 다시 시도해주세요.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsResending(true);
        setErrors({});

        try {
            // TODO: 실제 이메일 재발송 API 연동
            console.log('인증 코드 재발송:', email);

            // 임시 지연
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 카운트다운 재설정
            setCountdown(300);
            alert('인증 코드가 재발송되었습니다.');

        } catch (error) {
            setErrors({ general: '인증 코드 재발송에 실패했습니다.' });
        } finally {
            setIsResending(false);
        }
    };

    if (!email) {
        return null; // useEffect에서 리디렉트 처리
    }

    return (
        <div className={styles.verificationPage}>
            <div className={styles.container}>
                <div className={styles.verificationCard}>
                    <div className={styles.header}>
                        <div className={styles.icon}>📧</div>
                        <h1 className={styles.title}>이메일 인증</h1>
                        <p className={styles.subtitle}>
                            <strong>{email}</strong>로<br />
                            인증 코드를 발송했습니다.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {errors.general && (
                            <div className={styles.generalError}>{errors.general}</div>
                        )}

                        <Input
                            type="text"
                            name="code"
                            label="인증 코드"
                            placeholder="6자리 숫자를 입력해주세요"
                            value={form.code}
                            onChange={handleChange}
                            error={errors.code}
                            variant="auth"
                            maxLength={6}
                            className={styles.codeInput}
                        />

                        <div className={styles.timer}>
                            {countdown > 0 ? (
                                <span className={styles.countdown}>
                                    남은 시간: {formatTime(countdown)}
                                </span>
                            ) : (
                                <span className={styles.expired}>인증 시간이 만료되었습니다.</span>
                            )}
                        </div>

                        <Button
                            type="submit"
                            theme="beige"
                            size="large"
                            disabled={isLoading || countdown === 0}
                            className={styles.verifyButton}
                        >
                            {isLoading ? '인증 중...' : '인증하기'}
                        </Button>

                        <div className={styles.resendSection}>
                            <p className={styles.resendText}>코드를 받지 못하셨나요?</p>
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={isResending || countdown > 240} // 1분 후부터 재발송 가능
                                className={styles.resendButton}
                            >
                                {isResending ? '발송 중...' : '인증 코드 재발송'}
                            </button>
                        </div>
                    </form>

                    <div className={styles.footer}>
                        <p className={styles.backText}>
                            이메일을 변경하고 싶으시면{' '}
                            <button
                                onClick={() => navigate('/signup')}
                                className={styles.backLink}
                            >
                                회원가입으로 돌아가기
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
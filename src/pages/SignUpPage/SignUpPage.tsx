import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Button';
import Input from '@/components/Input';
import styles from './SignUpPage.module.css';

interface SignUpForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignUpErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [form, setForm] = useState<SignUpForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<SignUpErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): SignUpErrors => {
        const newErrors: SignUpErrors = {};

        if (!form.name.trim()) {
            newErrors.name = '이름을 입력해주세요.';
        } else if (form.name.trim().length < 2) {
            newErrors.name = '이름은 2자 이상이어야 합니다.';
        }

        if (!form.email) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = '올바른 이메일 형식을 입력해주세요.';
        }

        if (!form.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (form.password.length < 6) {
            newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(form.password)) {
            newErrors.password = '비밀번호는 영문과 숫자를 포함해야 합니다.';
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = '비밀번호를 다시 입력해주세요.';
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        // 에러 메시지 클리어
        if (errors[name as keyof SignUpErrors]) {
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
            await signup(form.name, form.email, form.password);

            // 성공 시 이메일 인증 페이지로 리디렉트
            alert('회원가입이 완료되었습니다. 이메일로 발송된 인증 코드를 입력해주세요.');
            navigate(`/email-verification?email=${encodeURIComponent(form.email)}`);

        } catch (error) {
            setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.signUpPage}>
            <div className={styles.container}>
                <div className={styles.signUpCard}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>회원가입</h1>
                        <p className={styles.subtitle}>Pawtrait에서 반려동물과 함께하세요</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {errors.general && (
                            <div className={styles.generalError}>{errors.general}</div>
                        )}

                        <Input
                            type="text"
                            name="name"
                            label="이름"
                            placeholder="이름을 입력해주세요"
                            value={form.name}
                            onChange={handleChange}
                            error={errors.name}
                            variant="auth"
                        />

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
                            placeholder="비밀번호를 입력해주세요 (영문+숫자 6자 이상)"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                            variant="auth"
                        />

                        <Input
                            type="password"
                            name="confirmPassword"
                            label="비밀번호 확인"
                            placeholder="비밀번호를 다시 입력해주세요"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            variant="auth"
                        />

                        <Button
                            type="submit"
                            theme="beige"
                            size="large"
                            disabled={isLoading}
                            className={styles.signUpButton}
                        >
                            {isLoading ? '가입 중...' : '회원가입'}
                        </Button>
                    </form>

                    <div className={styles.footer}>
                        <p className={styles.loginText}>
                            이미 계정이 있으신가요?{' '}
                            <Link to="/login" className={styles.loginLink}>
                                로그인
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
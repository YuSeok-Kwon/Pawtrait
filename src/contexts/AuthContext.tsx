import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 사용자 타입 정의
export interface User {
    id: string;
    name: string;
    email: string;
}

// 소셜 로그인 타입
export type SocialProvider = 'kakao' | 'google';

export interface SocialUser {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
    provider: SocialProvider;
}

// 인증 컨텍스트 타입 정의
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    socialLogin: (provider: SocialProvider, socialUser: SocialUser) => Promise<void>;
    logout: () => void;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props 타입
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 컴포넌트 마운트 시 로컬스토리지에서 사용자 정보 확인
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const token = localStorage.getItem('authToken');
                const userData = localStorage.getItem('userData');

                if (token && userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Auth status check failed:', error);
                // 에러 발생 시 로컬스토리지 클리어
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // 로그인 함수
    const login = async (email: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);

            // TODO: 실제 API 호출로 교체
            // 임시 로그인 로직 (실제로는 서버에서 JWT 토큰을 받아와야 함)
            const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
                setTimeout(() => {
                    if (email === 'test@pawtrait.com' && password === '123456') {
                        resolve({
                            user: {
                                id: '1',
                                name: '테스트 사용자',
                                email: email,
                            },
                            token: 'fake-jwt-token',
                        });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                }, 1000);
            });

            // 로그인 성공 시 토큰과 사용자 정보 저장
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userData', JSON.stringify(response.user));
            setUser(response.user);

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 회원가입 함수
    const signup = async (name: string, email: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);

            // TODO: 실제 API 호출로 교체
            // 임시 회원가입 로직
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });

            // 회원가입 성공 (실제로는 이메일 인증 등의 프로세스가 필요할 수 있음)
            console.log('Signup successful for:', { name, email, passwordLength: password.length });

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 소셜 로그인 함수
    const socialLogin = async (provider: SocialProvider, socialUser: SocialUser): Promise<void> => {
        try {
            setIsLoading(true);

            // TODO: 실제 API 호출로 교체
            // 소셜 로그인 사용자 정보를 서버에 전송하고 JWT 토큰 받기
            const response = await new Promise<{ user: User; token: string }>((resolve) => {
                setTimeout(() => {
                    resolve({
                        user: {
                            id: socialUser.id,
                            name: socialUser.name,
                            email: socialUser.email,
                        },
                        token: `${provider}-jwt-token`,
                    });
                }, 1000);
            });

            // 로그인 성공 시 토큰과 사용자 정보 저장
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userData', JSON.stringify(response.user));
            setUser(response.user);

        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // 로그아웃 함수
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setUser(null);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        socialLogin,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth 훅
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
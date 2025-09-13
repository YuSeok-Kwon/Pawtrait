import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 간단한 사용자 타입 (하나로 통합)
export interface User {
    id: string;
    name: string;
    email: string;
    loginType?: string; // 'email' | 'kakao' | 'google'
}

// 간단한 인증 컨텍스트 타입 (주니어 친화적)
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string) => void;
    socialLogin: (loginType: string, name: string, email: string) => void;
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

    // 로그인 만료 시간 (2시간) - 주니어 개발자가 쉽게 수정할 수 있게
    const LOGIN_DURATION = 2 * 60 * 60 * 1000; // 2시간

    // 페이지 새로고침 시 로그인 상태 복구 (만료 시간 체크 포함)
    useEffect(() => {
        const savedUser = localStorage.getItem('pawtrait_user');
        const loginTime = localStorage.getItem('pawtrait_login_time');

        if (savedUser && loginTime) {
            try {
                const user = JSON.parse(savedUser);
                const loginTimestamp = parseInt(loginTime);
                const currentTime = Date.now();

                // 설정된 시간이 지났으면 자동 로그아웃
                if (currentTime - loginTimestamp > LOGIN_DURATION) {
                    localStorage.removeItem('pawtrait_user');
                    localStorage.removeItem('pawtrait_login_time');
                    console.log('로그인이 만료되어 자동 로그아웃됩니다.');
                } else {
                    setUser(user);
                }
            } catch {
                localStorage.removeItem('pawtrait_user');
                localStorage.removeItem('pawtrait_login_time');
            }
        }

        setIsLoading(false);
    }, []);

    // 로그인 (테스트용 - 나중에 실제 서버 연동)
    const login = (email: string, password: string) => {
        setIsLoading(true);

        // 테스트 계정 확인
        if (email === 'test@pawtrait.com' && password === '123456') {
            const testUser: User = {
                id: '1',
                name: '테스트 사용자',
                email: email
            };

            // 사용자 정보와 로그인 시간 저장
            localStorage.setItem('pawtrait_user', JSON.stringify(testUser));
            localStorage.setItem('pawtrait_login_time', Date.now().toString());
            setUser(testUser);
        } else {
            alert('이메일: test@pawtrait.com, 비밀번호: 123456 으로 테스트해주세요');
        }

        setIsLoading(false);
    };

    // 회원가입 (테스트용 - 나중에 실제 서버 연동)
    const signup = (name: string, email: string, password: string) => {
        setIsLoading(true);

        // 회원가입 성공했다고 가정하고 바로 로그인 처리
        const newUser: User = {
            id: Date.now().toString(),
            name: name,
            email: email
        };

        // 사용자 정보와 로그인 시간 저장
        localStorage.setItem('pawtrait_user', JSON.stringify(newUser));
        localStorage.setItem('pawtrait_login_time', Date.now().toString());
        setUser(newUser);
        setIsLoading(false);

        console.log('회원가입 완료:', { name, email, password: password.length + '글자' });
    };

    // 구글, 카카오 등 소셜 로그인 (아직 구현하지 않음)
    const socialLogin = () => {
        console.log('소셜 로그인 기능은 아직 구현되지 않았습니다.');
    };

    // 로그아웃 - 저장된 정보 삭제
    const logout = () => {
        localStorage.removeItem('pawtrait_user');
        localStorage.removeItem('pawtrait_login_time');
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
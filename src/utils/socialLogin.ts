// 소셜 로그인 제공자 타입 정의
export type SocialProvider = 'kakao' | 'google';

// 소셜 로그인 설정 (실제 배포시에는 환경변수 사용)
export const SOCIAL_LOGIN_CONFIG = {
  kakao: {
    clientId: 'YOUR_KAKAO_CLIENT_ID', // 실제 카카오 앱 키로 교체 필요
    redirectUri: `${window.location.origin}/auth/kakao/callback`,
    scope: 'profile_nickname,account_email',
  },
  google: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // 실제 구글 클라이언트 ID로 교체 필요
    redirectUri: `${window.location.origin}/auth/google/callback`,
    scope: 'profile email',
  },
};

// 카카오 로그인 URL 생성
export const getKakaoLoginUrl = (): string => {
  const { clientId, redirectUri, scope } = SOCIAL_LOGIN_CONFIG.kakao;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
  });
  
  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

// 구글 로그인 URL 생성
export const getGoogleLoginUrl = (): string => {
  const { clientId, redirectUri, scope } = SOCIAL_LOGIN_CONFIG.google;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: scope,
    access_type: 'offline',
    prompt: 'consent',
  });
  
  return `https://accounts.google.com/oauth2/auth?${params.toString()}`;
};

// 소셜 로그인 시작 (팝업 방식)
export const startSocialLogin = (provider: SocialProvider): Promise<string> => {
  return new Promise((resolve, reject) => {
    let authUrl: string;
    
    switch (provider) {
      case 'kakao':
        authUrl = getKakaoLoginUrl();
        break;
      case 'google':
        authUrl = getGoogleLoginUrl();
        break;
      default:
        reject(new Error('Unsupported social provider'));
        return;
    }

    // 팝업 창 열기
    const popup = window.open(
      authUrl,
      'socialLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    if (!popup) {
      reject(new Error('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.'));
      return;
    }

    // 팝업 메시지 리스너
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data.type === 'SOCIAL_LOGIN_SUCCESS') {
        cleanup();
        resolve(event.data.code);
      } else if (event.data.type === 'SOCIAL_LOGIN_ERROR') {
        cleanup();
        reject(new Error(event.data.error || '소셜 로그인에 실패했습니다.'));
      }
    };

    // 팝업 닫힘 감지
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        cleanup();
        reject(new Error('로그인이 취소되었습니다.'));
      }
    }, 1000);

    const cleanup = () => {
      window.removeEventListener('message', messageListener);
      clearInterval(checkClosed);
      if (!popup.closed) {
        popup.close();
      }
    };

    window.addEventListener('message', messageListener);
  });
};

// OAuth 코드를 사용하여 사용자 정보 가져오기 (실제로는 백엔드에서 처리)
export const exchangeCodeForUserInfo = async (
  provider: SocialProvider, 
  code: string
): Promise<{
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}> => {
  // TODO: 실제 백엔드 API 엔드포인트로 교체
  const response = await fetch(`/api/auth/social/${provider}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error(`소셜 로그인 실패: ${response.statusText}`);
  }

  return response.json();
};
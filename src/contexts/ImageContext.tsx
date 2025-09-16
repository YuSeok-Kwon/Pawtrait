import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 이미지 데이터(사진 URL)와 관련된 Context 타입을 정의합니다.
// - currentPhoto: 현재 선택된 사진의 URL (string)
// - setCurrentPhoto: 사진 URL을 변경하는 함수
// - clearPhoto: 현재 사진을 초기화하는 함수
interface ImageContextType {
    currentPhoto: string;
    setCurrentPhoto: (photo: string) => void;
    clearPhoto: () => void;
}

// ImageContext를 생성합니다.
// 이 Context는 앱의 다른 컴포넌트들이 이미지 데이터에 접근할 수 있도록 도와줍니다.
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// ImageProvider 컴포넌트는 앱 전체에 이미지 데이터를 제공하는 역할을 합니다.
// props로 children을 받아서 내부에 있는 컴포넌트들이 Context를 사용할 수 있게 합니다.
export function ImageProvider({ children }: { children: ReactNode }) {
    // useState를 사용하여 'currentPhoto' 상태를 관리합니다.
    // 초기값은 localStorage에 저장된 값이 있으면 그 값을 사용하고, 없으면 빈 문자열로 시작합니다.
    // 이렇게 하면 페이지를 새로고침해도 이전에 선택한 이미지가 유지됩니다.
    const [currentPhoto, setCurrentPhoto] = useState<string>(() => {
        return localStorage.getItem('pawtrait_current_photo') || '';
    });

    // currentPhoto 상태가 변경될 때마다 localStorage에 값을 저장하는 useEffect 훅입니다.
    // 의존성 배열에 [currentPhoto]를 전달하여, currentPhoto가 바뀔 때만 이 함수가 실행되도록 합니다.
    useEffect(() => {
        if (currentPhoto) {
            // 사진 URL이 있으면 localStorage에 저장합니다.
            localStorage.setItem('pawtrait_current_photo', currentPhoto);
        } else {
            // 사진 URL이 없으면 (예: clearPhoto 호출 시) localStorage에서 항목을 제거합니다.
            localStorage.removeItem('pawtrait_current_photo');
        }
    }, [currentPhoto]);

    // 현재 사진을 초기화하는 함수입니다.
    const clearPhoto = () => {
        setCurrentPhoto(''); // 상태를 빈 문자열로 변경하면 useEffect가 호출되어 localStorage도 정리됩니다.
    };

    // Context.Provider를 통해 하위 컴포넌트들에게 상태와 함수들을 전달합니다.
    const contextValue = {
        currentPhoto,
        setCurrentPhoto,
        clearPhoto,
    };

    return (
        <ImageContext.Provider value={contextValue}>
            {children}
        </ImageContext.Provider>
    );
}

// useImage 훅은 다른 컴포넌트에서 쉽게 ImageContext의 값들을 사용할 수 있게 해줍니다.
// 매번 useContext(ImageContext)를 쓰는 대신 useImage()만 호출하면 됩니다.
export function useImage() {
    const context = useContext(ImageContext);
    if (context === undefined) {
        // 만약 ImageProvider 외부에서 이 훅을 사용하면 에러를 발생시킵니다.
        // 이는 개발자가 Provider를 올바르게 사용하도록 강제하는 좋은 패턴입니다.
        throw new Error('useImage must be used within an ImageProvider');
    }
    return context;
}
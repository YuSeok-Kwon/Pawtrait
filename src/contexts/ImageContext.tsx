import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ImageContextType {
    currentPhoto: string;
    setCurrentPhoto: (photo: string) => void;
    transformedPhoto: string;
    setTransformedPhoto: (photo: string) => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    imageId: string;
    setImageId: (id: string) => void;
    clearPhoto: () => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
    // localStorage에서 저장된 이미지 URL을 불러온다
    const [currentPhoto, setCurrentPhoto] = useState<string>(() => {
        return localStorage.getItem('pawtrait_current_photo') || '';
    });

    const [transformedPhoto, setTransformedPhoto] = useState<string>(() => {
        return localStorage.getItem('pawtrait_transformed_photo') || '';
    });

    const [selectedStyle, setSelectedStyle] = useState<string>(() => {
        return localStorage.getItem('pawtrait_selected_style') || '';
    });

    const [imageId, setImageId] = useState<string>(() => {
        return localStorage.getItem('pawtrait_image_id') || '';
    });

    // 이미지 URL 변경시 localStorage에 저장
    useEffect(() => {
        if (currentPhoto) {
            localStorage.setItem('pawtrait_current_photo', currentPhoto);
        } else {
            localStorage.removeItem('pawtrait_current_photo');
        }
    }, [currentPhoto]);

    useEffect(() => {
        if (transformedPhoto) {
            localStorage.setItem('pawtrait_transformed_photo', transformedPhoto);
        } else {
            localStorage.removeItem('pawtrait_transformed_photo');
        }
    }, [transformedPhoto]);

    useEffect(() => {
        if (selectedStyle) {
            localStorage.setItem('pawtrait_selected_style', selectedStyle);
        } else {
            localStorage.removeItem('pawtrait_selected_style');
        }
    }, [selectedStyle]);

    useEffect(() => {
        if (imageId) {
            localStorage.setItem('pawtrait_image_id', imageId);
        } else {
            localStorage.removeItem('pawtrait_image_id');
        }
    }, [imageId]);

    const clearPhoto = () => {
        setCurrentPhoto('');
        setTransformedPhoto('');
        setSelectedStyle('');
        setImageId('');
    };

    const contextValue = {
        currentPhoto,
        setCurrentPhoto,
        transformedPhoto,
        setTransformedPhoto,
        selectedStyle,
        setSelectedStyle,
        imageId,
        setImageId,
        clearPhoto,
    };

    return (
        <ImageContext.Provider value={contextValue}>
            {children}
        </ImageContext.Provider>
    );
}

export function useImage() {
    const context = useContext(ImageContext);
    if (context === undefined) {
        throw new Error('useImage must be used within an ImageProvider');
    }
    return context;
}
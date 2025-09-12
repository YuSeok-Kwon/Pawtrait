import css from "./Button.module.css"

// ToDo : 버튼 컴포넌트 완성하기
interface ButtonProps {
    text: string;
    onClick: () => void;
    theme: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function Button({ text, onClick, theme, className, size = 'medium', }: ButtonProps) {

    return (
        <button onClick={onClick} className={`${css[theme]} ${css[size]} ${className}`}> {text} </button >
    )
}

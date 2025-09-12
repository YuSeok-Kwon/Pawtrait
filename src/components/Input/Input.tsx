import { forwardRef } from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: 'default' | 'auth';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, variant = 'default', className = '', ...props }, ref) => {
        const inputClassName = `${styles.input} ${styles[variant]} ${error ? styles.error : ''} ${className}`;

        return (
            <div className={styles.inputWrapper}>
                {label && <label className={styles.label}>{label}</label>}
                <input ref={ref} className={inputClassName} {...props} />
                {error && <span className={styles.errorMessage}>{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
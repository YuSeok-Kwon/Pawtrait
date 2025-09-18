import React from 'react';
import styles from './Notice.module.css';

export type NoticeType = 'warning' | 'error' | 'info' | 'success';

interface NoticeAction {
    label: string;
    onClick: () => void;
}

interface NoticeProps {
    type?: NoticeType;
    title?: string;
    children: React.ReactNode;
    actions?: NoticeAction[];
    className?: string;
}

const Notice: React.FC<NoticeProps> = ({
    type = 'info',
    title,
    children,
    actions,
    className = ''
}) => {
    return (
        <div className={`${styles.notice} ${styles[`type-${type}`]} ${className}`.trim()}>
            {title && <div className={styles.title}>{title}</div>}
            <div>{children}</div>
            {actions && actions.length > 0 && (
                <div className={styles.actions}>
                    {actions.map(a => (
                        <button key={a.label} className={styles.buttonLike} onClick={a.onClick}>{a.label}</button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notice;

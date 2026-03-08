import React from 'react';
import styles from './index.module.css';

interface IProps {
    loading: boolean;
}

export const CustomSpinner: React.FC<IProps> = ({
    loading
}) => {
    if (!loading) {
        return null;
    }
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinnerOuter}></div>
            <div className={styles.spinnerInner}></div>
        </div>
    )
}

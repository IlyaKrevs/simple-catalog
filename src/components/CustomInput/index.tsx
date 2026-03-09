import React, { useCallback, useRef, useState } from 'react';
import styles from './index.module.css';
interface IProps {
    handleDebounceInput: (v: string) => void,
}

export const CustomInput: React.FC<IProps> = ({
    handleDebounceInput
}) => {
    const [input, setInput] = useState('');
    const timeoutIdRef = useRef<NodeJS.Timeout>(null);
    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
            handleDebounceInput(value);
        }, 300);
    }, [handleDebounceInput])

    return (
        <div className={styles.inputContainer}>
            <input type="text" value={input} onChange={handleOnChange} />
        </div>
    )
}

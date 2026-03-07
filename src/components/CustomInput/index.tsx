import React, { useCallback, useRef } from 'react';
import styles from './index.module.css';
interface IProps {
    input: string,
    handleInput: (v: string) => void,
    handleDebounceInput: (v: string) => void,
}

export const CustomInput: React.FC<IProps> = ({ input, handleInput, handleDebounceInput }) => {

    const timeoutIdRef = useRef<NodeJS.Timeout>(null);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleInput(value);

        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = setTimeout(() => {
            handleDebounceInput(value);
        }, 300);
    }, [handleDebounceInput, handleInput])
    return (
        <div className={styles.inputContainer}>
            <input type="text" value={input} onChange={handleOnChange} />
        </div>
    )
}

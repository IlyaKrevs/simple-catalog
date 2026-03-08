import React from 'react';
import styles from './intex.module.css';

interface IProps {
    current: number,
    total: number,
    perPage: number,
    pickPage: (v: number) => void,
}

export const CustomPaginatiom: React.FC<IProps> = ({
    current,
    total,
    perPage,
    pickPage
}) => {
    const totalPages = Math.ceil(total / perPage);

    const prevFromCurrent = Math.max(1, current - 1);
    const nextFromCurrent = Math.min(totalPages, current + 1);

    const pages = [];

    pages.push(1);

    if (prevFromCurrent > 2) {
        pages.push(null);
    }

    for (let i = Math.max(2, prevFromCurrent); i <= Math.min(nextFromCurrent, totalPages - 1); i++) {
        pages.push(i);
    }

    if (nextFromCurrent < totalPages - 1) {
        pages.push(null);
    }


    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <div className={styles.paginationContainer}>
            {pages.map((item, index) => {
                if (item === null) {
                    return (
                        <div
                            key={index}
                            className={styles.ellipsis}>
                            ...
                        </div>
                    );
                }
                return (
                    <button
                        key={index}
                        className={[
                            styles.defaultButton,
                            current === item ? styles.currentPage : ''
                        ].join(' ')}
                        onClick={() => pickPage(item)}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

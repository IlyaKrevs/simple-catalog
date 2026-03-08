import React from 'react';
import styles from './index.module.css';
import { CustomSpinner } from '../CustomSpinner';

interface IProps {
    titles: string[],
    data: Record<string, string | number>[],
    loading: boolean,
    imageKeys: string[];
}

export const CustomGrid: React.FC<IProps> = ({
    titles,
    data,
    loading,
    imageKeys
}) => {
    return (
        <div
            className={styles.gridContainer}
            style={{
                gridTemplateColumns: `repeat(${titles.length}, 1fr)`,
            }}
        >
            <CustomSpinner
                loading={loading}
            />
            {titles.map(item => {
                return <div className={styles.titleCell}>
                    {item}
                </div>
            })}

            {data.map(item => {
                return Object.entries(item)
                    .map(([key, value]) => {
                        if (imageKeys.includes(key)) {
                            return <img className={styles.imgCell} src={value + ''} alt={key} />
                        } else {
                            return <div className={styles.defaultCell}>{value}</div>
                        }
                    })
            })}
        </div>
    )
}

import React from 'react';
import styles from './styles.scss';

export default function Wrapper({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
};
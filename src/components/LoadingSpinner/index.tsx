import React from 'react';
import styles from './loadingSpinner.module.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loader}>
      {/* <div className={styles.loaderB}></div> */}
      {/* <div className={styles.loaderA}></div> */}
      <div className={styles.loaderC}></div>
      <div className={styles.loaderD}></div>
      <div className={styles.loaderF}></div>
      <div className={styles.loaderG}></div>
    </div>

  )
}

export default LoadingSpinner;
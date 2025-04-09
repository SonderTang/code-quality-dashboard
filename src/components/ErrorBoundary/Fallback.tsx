// components/ErrorBoundary/Fallback.tsx
import React from 'react'
import styles from './style.module.scss'

type FallbackProps = {
  error?: Error | null
  onReset?: () => void
}

const Fallback: React.FC<FallbackProps> = ({ error, onReset }) => (
  <div className={styles.container}>
    <h1>⚠️ 系统遇到问题</h1>
    <p className={styles.message}>{error?.message || '未知错误'}</p>
    <button
      className={styles.retryButton}
      onClick={onReset}
    >
      点击重试
    </button>
  </div>
)

export default Fallback
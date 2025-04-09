// components/ErrorBoundary/index.tsx
import React, { Component, ReactNode } from 'react'
import Fallback from './Fallback'
import styles from './style.module.scss'

type Props = {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
}

type State = {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Fallback
          error={this.state.error}
          onReset={this.handleReset}
        />
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
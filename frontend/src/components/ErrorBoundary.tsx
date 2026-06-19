import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: '#000000' }}>
          <p className="font-mono text-sm mb-4" style={{ color: '#ffffff' }}>Error</p>
          <h1 className="text-3xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8">Try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg font-medium text-black"
            style={{ background: 'linear-gradient(135deg, #ffffff, #d4d4d4)' }}
          >
            Refresh Page
          </button>
        </main>
      )
    }
    return this.props.children
  }
}

import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error boundary caught an error.', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#070a12] px-5 text-white">
          <section className="max-w-xl rounded-lg border border-white/10 bg-white/[0.04] p-6 text-center shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Something went wrong
            </p>
            <h1 className="mt-3 text-2xl font-bold">DSA Vision AI hit an unexpected error.</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The application recovered at the boundary level. Reload the app to
              continue the demo.
            </p>
            <button
              className="mt-5 rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              onClick={this.handleReset}
              type="button"
            >
              Reload app
            </button>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
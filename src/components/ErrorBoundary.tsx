import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('UI error boundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-6">
        <h1 className="text-xl font-bold mb-2">Something went wrong.</h1>
        <pre className="text-xs whitespace-pre-wrap">{this.state.error?.message}</pre>
      </div>;
    }
    return this.props.children;
  }
}

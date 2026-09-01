import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in customer app:', error, errorInfo);
  }

  private handleReset = () => {
    // platform:web
    localStorage.removeItem('smartserve_customer_token');
    localStorage.removeItem('smartserve_customer_user');
    window.location.href = '/login';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#F8FAFC] px-4 text-center">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Something went wrong</h2>
            <p className="mt-2 text-sm text-slate-600">
              {this.state.error?.message || 'An unexpected error occurred in the application.'}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-xl bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Clear Session & Sign In
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

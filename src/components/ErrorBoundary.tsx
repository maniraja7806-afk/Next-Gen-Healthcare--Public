import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
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
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    (this as any).setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FBFF] dark:bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-md w-full text-center">
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We're sorry, but the application encountered an unexpected error.
              Please try refreshing the page.
            </p>
            {this.state.error && (
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-left overflow-auto text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 max-h-40">
                <p className="font-mono">{this.state.error.message}</p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center px-6 py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium rounded-xl shadow-sm transition-colors"
            >
              <RefreshCcw size={18} className="mr-2" />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

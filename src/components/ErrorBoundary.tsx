'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="border-error-200 bg-error-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertCircleIcon className="h-6 w-6 text-error-600" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-error-800">
                  Something went wrong
                </h3>
                <p className="text-error-600 mt-1">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-error-700">
                      Error Details
                    </summary>
                    <pre className="mt-2 text-xs text-error-600 bg-error-100 p-2 rounded overflow-auto">
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
              <Button 
                variant="outline" 
                onClick={this.handleRetry}
                className="border-error-300 text-error-700 hover:bg-error-100"
              >
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // You can integrate with error reporting services here
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  };
}

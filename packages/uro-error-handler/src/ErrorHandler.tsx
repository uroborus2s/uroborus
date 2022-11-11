import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
import { Logger } from '@uroborus/core';

export interface ErrorBoundaryProps {
  logger: Logger;
  render: ({ error }: any) => ReactNode;
  showError: (props: unknown) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { showError } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      this.logError(error);

      // Allows to trigger the Error event and all listener can run on Error
      showError({ error, errorInfo });
    }
  }

  logError(error: Error, errorInfo?: ErrorInfo) {
    const { logger } = this.props;
    logger.error(
      `An unexpected error occurred. Error: ${error && error.message}. `,
      error,
      errorInfo,
    );
  }

  render() {
    const { render, children } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return render({ error });
    }

    return children;
  }
}

export default ErrorBoundary;

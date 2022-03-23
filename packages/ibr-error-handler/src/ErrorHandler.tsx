import { Component, ErrorInfo, ReactNode } from 'react';
import { Logger } from '@uroborus/core';

export interface ErrorBoundaryProps {
  logger: Logger;
  render: ({ error }: any) => ReactNode;
  showError: (props: unknown) => void;
  hasError: boolean;
  componentProps?: unknown[];
}

class ErrorBoundary extends Component<ErrorBoundaryProps, any> {
  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  logError(error: Error, errorInfo?: ErrorInfo) {
    this.props.logger.error(
      `An unexpected error occurred. Error: ${error && error.message}. `,
      error,
      errorInfo,
    );
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.hasError) {
      this.logError(error);

      // Allows to trigger the Error event and all listener can run on Error
      this.props.showError({ error, errorInfo });
    }
  }

  render() {
    if (this.props.hasError || this.state?.hasError) {
      // You can render any custom fallback UI
      return this.props.render(this.props.componentProps || this.state);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

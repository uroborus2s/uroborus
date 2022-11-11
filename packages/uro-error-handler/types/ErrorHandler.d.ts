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
declare class ErrorBoundary extends Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): {
        hasError: boolean;
        error: Error;
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    logError(error: Error, errorInfo?: ErrorInfo): void;
    render(): ReactNode;
}
export default ErrorBoundary;

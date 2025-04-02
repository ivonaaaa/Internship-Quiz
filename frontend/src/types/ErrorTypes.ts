export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

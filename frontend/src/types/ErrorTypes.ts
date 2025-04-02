export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

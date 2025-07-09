import { QueryClient } from "@tanstack/react-query";
import { AppApiError } from "./api-error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error instanceof AppApiError && error.isAuthError()) {
          return false;
        }
        // Don't retry on validation errors
        if (error instanceof AppApiError && error.isValidationError()) {
          return false;
        }
        // Don't retry on client errors (4xx)
        if (error instanceof AppApiError && error.statusCode >= 400 && error.statusCode < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors
        if (error instanceof AppApiError && error.statusCode >= 400 && error.statusCode < 500) {
          return false;
        }
        return failureCount < 1;
      },
      retryDelay: 1000,
    },
  },
});

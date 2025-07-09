import { ApiErrorSchema, ValidationErrorSchema } from "@movie-app/shared-types";
import type { ApiError, ValidationError } from "@movie-app/shared-types";

export class AppApiError extends Error {
  public readonly statusCode: number;
  public readonly error: string;
  public readonly timestamp: string;
  public readonly path: string;
  public readonly details?: ValidationError["details"];

  constructor(apiError: ApiError | ValidationError) {
    super(apiError.message);
    this.name = "AppApiError";
    this.statusCode = apiError.statusCode;
    this.error = apiError.error;
    this.timestamp = apiError.timestamp;
    this.path = apiError.path;

    if ("details" in apiError) {
      this.details = apiError.details;
    }
  }

  static fromAxiosError(error: unknown): AppApiError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosError = error as any;
    if (axiosError.response?.data) {
      // Try to parse as ValidationError first
      const validationResult = ValidationErrorSchema.safeParse(axiosError.response.data);
      if (validationResult.success) {
        return new AppApiError(validationResult.data);
      }

      // Try to parse as ApiError
      const apiResult = ApiErrorSchema.safeParse(axiosError.response.data);
      if (apiResult.success) {
        return new AppApiError(apiResult.data);
      }
    }

    // Fallback for network errors or unexpected formats
    return new AppApiError({
      message: this.getDefaultMessage(axiosError),
      statusCode: axiosError.response?.status || 0,
      error: axiosError.code || "UNKNOWN_ERROR",
      timestamp: new Date().toISOString(),
      path: axiosError.config?.url || "unknown",
    });
  }

  private static getDefaultMessage(error: unknown): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const axiosError = error as any;
    if (!axiosError.response) {
      return "Network error. Please check your connection and try again.";
    }

    switch (axiosError.response.status) {
      case 400:
        return "Invalid request. Please check your input and try again.";
      case 401:
        return "You are not authorized. Please log in and try again.";
      case 403:
        return "You do not have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This action conflicts with existing data.";
      case 422:
        return "The data you provided is invalid.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
        return "Server error. Please try again later.";
      case 502:
      case 503:
      case 504:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }

  getUserFriendlyMessage(): string {
    if (this.details && this.details.length > 0) {
      const fieldErrors = this.details.map((d) => `${d.field}: ${d.message}`).join(", ");
      return `Validation error: ${fieldErrors}`;
    }
    return this.message;
  }

  isNetworkError(): boolean {
    return this.statusCode === 0;
  }

  isValidationError(): boolean {
    return !!this.details;
  }

  isAuthError(): boolean {
    return this.statusCode === 401 || this.statusCode === 403;
  }
}

/**
 * ErrorDisplay Component
 * A generic error boundary UI for displaying errors with retry functionality.
 * @param error - The error object captured
 * @param reset - Function to reset the error boundary state
 */
"use client";

import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "../atoms/button";

interface ErrorDisplayProps {
  /** The error that occurred */
  error?: Error;
  /** Reset callback to retry the failed operation */
  reset?: () => void;
  /** Custom title for the error */
  title?: string;
  /** Custom message for the error */
  message?: string;
  /** Whether to show the home button */
  showHome?: boolean;
}

export function ErrorDisplay({
  error,
  reset,
  title = "Something went wrong!",
  message,
  showHome = true,
}: ErrorDisplayProps) {
  const displayMessage = message || error?.message || "An unexpected error occurred. Please try again.";

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-lg border border-red-500/30 bg-red-900/20 p-8">
      <div className="mb-4 rounded-full bg-red-500/20 p-3">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>

      <h2 className="mb-2 text-center text-xl font-semibold text-red-400">{title}</h2>

      <p className="mb-4 text-center text-sm leading-relaxed text-red-200">{displayMessage}</p>

      <div className="mb-6 text-center text-xs text-red-300/70">The show must go on... 🎬</div>

      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        {reset && (
          <Button variant="destructive" size="default" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}

        {showHome && (
          <Button variant="secondary" size="default" onClick={() => (window.location.href = "/")}>
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        )}
      </div>

      {process.env.NODE_ENV === "development" && error && (
        <details className="mt-4 w-full">
          <summary className="mb-2 cursor-pointer text-sm text-slate-300">Error Details (Development)</summary>
          <pre className="max-h-32 overflow-auto rounded bg-slate-900 p-3 text-xs text-red-400">{error.stack}</pre>
        </details>
      )}
    </div>
  );
}

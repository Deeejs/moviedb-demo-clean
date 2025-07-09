"use client";

import { useEffect } from "react";
import { ErrorDisplay } from "@movie-app/ui";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <ErrorDisplay
        error={error}
        reset={reset}
        title="Page Error"
        message="Something went wrong on this page. Please try again."
      />
    </div>
  );
}

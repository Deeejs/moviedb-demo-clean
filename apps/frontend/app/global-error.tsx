"use client";

import { useEffect } from "react";
import { ErrorDisplay } from "@movie-app/ui";

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
          <ErrorDisplay
            error={error}
            reset={reset}
            title="Application Error"
            message="A critical error occurred. Please refresh the page or try again later."
          />
        </div>
      </body>
    </html>
  );
}

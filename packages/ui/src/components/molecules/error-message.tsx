import { AlertCircle } from "lucide-react";
import { Button } from "../atoms/button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showIcon?: boolean;
}

export function ErrorMessage({ message, onRetry, showIcon = true }: ErrorMessageProps) {
  return (
    <div className="py-12 text-center">
      {showIcon && <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />}
      <p className="mb-4 text-lg text-red-400">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/20">
          Try Again
        </Button>
      )}
    </div>
  );
}

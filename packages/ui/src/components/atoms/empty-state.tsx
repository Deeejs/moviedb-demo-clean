import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({ message, icon, className = "py-12 text-center" }: EmptyStateProps) {
  return (
    <div className={className}>
      {icon && <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">{icon}</div>}
      <p className="text-lg text-slate-400">{message}</p>
    </div>
  );
}

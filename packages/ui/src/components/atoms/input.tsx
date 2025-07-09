import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border border-slate-600 bg-transparent px-3 py-1 text-base shadow-sm transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-slate-500 focus-visible:ring-1 focus-visible:ring-slate-500",
        className
      )}
      {...props}
    />
  );
}

export { Input };

import { ReactNode, ChangeEvent } from "react";
import { X } from "lucide-react";
import { Input } from "../atoms/input";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function SearchInput({
  placeholder,
  value,
  onChange,
  onClear,
  isLoading,
  icon,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      {icon && <div className="absolute top-1/2 left-4 -translate-y-1/2 transform text-slate-400">{icon}</div>}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        className={`h-14 rounded-xl border-slate-600 bg-slate-800/50 text-lg text-white placeholder:text-slate-400 focus:border-slate-500 ${
          icon ? "pl-12" : ""
        } ${value || onClear ? "pr-12" : ""}`}
      />
      {isLoading && value && (
        <div className="absolute top-1/2 right-12 -translate-y-1/2 transform">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
        </div>
      )}
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute top-1/2 right-4 -translate-y-1/2 transform p-1 text-slate-400 transition-colors hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

import { BaseGrid } from "../organisms/base-grid";

interface LoadingGridProps {
  count?: number;
  aspectRatio?: "aspect-[2/3]" | "aspect-[3/4]" | "aspect-square";
}

export function LoadingGrid({ count = 12, aspectRatio = "aspect-[2/3]" }: LoadingGridProps) {
  return (
    <BaseGrid
      count={count}
      aspectRatio={aspectRatio}
      renderPlaceholder={() => (
        <div className="animate-pulse">
          <div className={`rounded-lg bg-slate-800 ${aspectRatio} relative overflow-hidden`}>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="mt-2 space-y-2">
            <div className="relative h-4 w-3/4 overflow-hidden rounded bg-slate-800">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="relative h-3 w-1/2 overflow-hidden rounded bg-slate-800">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      )}
    />
  );
}

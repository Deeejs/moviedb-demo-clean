import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface BaseGridProps<T> {
  items?: T[];
  count?: number;
  aspectRatio?: "aspect-[2/3]" | "aspect-[3/4]" | "aspect-square";
  className?: string;
  renderItem?: (item: T, index: number) => ReactNode;
  renderPlaceholder?: (index: number) => ReactNode;
}

export function BaseGrid<T>({
  items = [],
  count,
  aspectRatio = "aspect-[2/3]",
  className,
  renderItem,
  renderPlaceholder,
}: BaseGridProps<T>) {
  const itemsToRender = items.length > 0 ? items : Array.from({ length: count || 12 });

  return (
    <div
      className={cn("grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6", className)}
    >
      {itemsToRender.map((item, index) => (
        <div key={items.length > 0 ? `item-${index}` : `placeholder-${index}`}>
          {items.length > 0 && renderItem ? (
            renderItem(item as T, index)
          ) : renderPlaceholder ? (
            renderPlaceholder(index)
          ) : (
            <div className="animate-pulse">
              <div className={cn("rounded-lg bg-slate-800", aspectRatio)}></div>
              <div className="mt-2 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-800"></div>
                <div className="h-3 w-1/2 rounded bg-slate-800"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

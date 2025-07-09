import Image from "next/image";
import Link from "next/link";
import { BaseGrid } from "./base-grid";

export interface MovieGridItem {
  id: string;
  title: string;
  year: number;
  poster?: string;
}

export interface MovieGridProps {
  movies: MovieGridItem[];
  isLoading?: boolean;
}

export function MovieGrid({ movies, isLoading }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="mb-2 aspect-[3/4] rounded-lg bg-slate-800"></div>
            <div className="mb-1 h-4 rounded bg-slate-800"></div>
            <div className="h-3 w-1/2 rounded bg-slate-800"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <BaseGrid<MovieGridItem>
      items={movies}
      aspectRatio="aspect-[3/4]"
      renderItem={(movie) => (
        <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-800 transition-transform group-hover:scale-105">
            <Image
              src={movie.poster || "/placeholder.svg?height=300&width=200&text=Movie+Poster"}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <h3 className="truncate text-sm font-medium text-white">{movie.title}</h3>
              <span className="ml-2 flex-shrink-0 text-xs text-slate-400">{movie.year}</span>
            </div>
          </div>
        </Link>
      )}
    />
  );
}

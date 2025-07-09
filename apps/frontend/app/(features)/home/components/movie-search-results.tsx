"use client";

import { BaseGrid, MediaCard, EmptyState, ErrorMessage, LoadingGrid } from "@movie-app/ui";
import { Star, Film } from "lucide-react";
import type { Movie } from "@movie-app/shared-types";

interface MovieSearchResultsProps {
  movies: Movie[];
  isLoading?: boolean;
  query?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export function MovieSearchResults({ movies, isLoading = false, query, error, onRetry }: MovieSearchResultsProps) {
  if (error) {
    return (
      <ErrorMessage
        message={`Failed to search movies${query ? ` for "${query}"` : ""}. Please try again.`}
        onRetry={onRetry}
      />
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-white">Searching for movies...</h2>
        <LoadingGrid count={8} aspectRatio="aspect-[2/3]" />
      </div>
    );
  }

  if (!movies.length && query) {
    return (
      <EmptyState message={`No movies found for "${query}"`} icon={<Film className="h-12 w-12 text-slate-500" />} />
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-white">
        {query ? `Movie Results for "${query}"` : "Movies"} ({movies.length})
      </h2>
      <BaseGrid
        items={movies}
        aspectRatio="aspect-[2/3]"
        renderItem={(movie) => (
          <MediaCard
            href={`/movies/${movie.id}`}
            title={movie.title}
            subtitle={movie.year?.toString()}
            imageUrl={movie.poster}
            aspectRatio="aspect-[2/3]"
            placeholder="🎬"
            overlay={
              movie.rating && (
                <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 transition-transform group-hover:translate-y-0">
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs text-yellow-500">{movie.rating.toFixed(1)}</span>
                  </div>
                </div>
              )
            }
          />
        )}
      />
    </div>
  );
}

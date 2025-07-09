"use client";

import { MovieGrid, EmptyState, PaginationControls } from "@movie-app/ui";
import { Film } from "lucide-react";
import type { Movie } from "@movie-app/shared-types";

interface MoviesPageViewProps {
  movies: Movie[];
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function MoviesPageView({ movies, total, hasNextPage, hasPrevPage }: MoviesPageViewProps) {
  const movieGridItems =
    movies?.map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
    })) || [];

  return (
    <div className="container mx-auto px-4 py-6 pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          All Movies <span className="text-slate-400">({total})</span>
        </h1>
      </div>

      {movieGridItems.length > 0 ? (
        <>
          <MovieGrid movies={movieGridItems} />
          <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
        </>
      ) : (
        <EmptyState message="No movies found." icon={<Film className="h-12 w-12 text-slate-500" />} />
      )}
    </div>
  );
}

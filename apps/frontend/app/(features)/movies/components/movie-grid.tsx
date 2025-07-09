"use client";

import { BaseGrid, MediaCard, ErrorMessage } from "@movie-app/ui";
import { useMovies } from "../hooks/use-movies";
import type { Movie } from "@movie-app/shared-types";

interface MovieGridProps {
  initialMovies?: Movie[];
}

export function MovieGrid({ initialMovies = [] }: MovieGridProps) {
  const { data: response, isLoading, error } = useMovies(initialMovies);
  const movies = response?.data || [];

  if (isLoading) {
    return <BaseGrid count={12} aspectRatio="aspect-[2/3]" />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load movies. Please try again later." />;
  }

  return (
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
        />
      )}
    />
  );
}

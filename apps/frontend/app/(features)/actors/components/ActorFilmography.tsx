"use client";

import { MovieGrid } from "@movie-app/ui";
import type { Actor, Movie } from "@movie-app/shared-types";

interface ActorFilmographyProps {
  actor: Actor;
}

export function ActorFilmography({ actor }: ActorFilmographyProps) {
  const movies =
    actor.castRoles
      ?.filter((role): role is typeof role & { movie: Movie } => role.movie !== undefined && role.movie !== null)
      .map((role) => ({
        id: role.movie.id,
        title: role.movie.title,
        year: role.movie.year,
        poster: role.movie.poster,
      })) || [];

  return (
    <div className="xl:col-span-3">
      <div className="mb-2">
        <h2 className="mb-2 text-3xl font-bold text-white">Filmography</h2>
        <p className="text-slate-400">
          {movies.length} {movies.length === 1 ? "movie" : "movies"}
        </p>
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-slate-400">No movies found for this actor.</p>
        </div>
      )}
    </div>
  );
}

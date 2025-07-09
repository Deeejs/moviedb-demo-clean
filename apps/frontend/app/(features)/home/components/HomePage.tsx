"use client";

/**
 * Landing Page - Root route of the Movie Database application
 *
 * This is the main entry point for users visiting the application.
 * Features: Movie search, popular movies grid, and site navigation.
 */
import { useState } from "react";
import { SearchSection } from "./search-section";
import { MovieSearchResults } from "./movie-search-results";
import { ActorSearchResults } from "./actor-search-results";
import { MovieGrid } from "@/features/movies/components/movie-grid";
import { useSearchMovies } from "@/features/movies/hooks/use-movies";
import { useSearchActors } from "@/features/actors/hooks/use-actors";
import { ErrorMessage } from "@movie-app/ui";
import type { Movie } from "@movie-app/shared-types";

interface HomePageProps {
  initialMovies: Movie[];
}

export default function HomePage({ initialMovies }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"movies" | "actors" | null>(null);
  const {
    data: movieResults,
    isLoading: isLoadingMovies,
    error: movieError,
  } = useSearchMovies(searchType === "movies" ? searchQuery : undefined);

  const {
    data: actorResults,
    isLoading: isLoadingActors,
    error: actorError,
  } = useSearchActors(searchType === "actors" ? searchQuery : undefined);

  const handleSearch = (query: string, type: "movies" | "actors") => {
    setSearchQuery(query);
    setSearchType(query ? type : null);
  };

  const handleRetrySearch = () => {
    if (searchQuery && searchType) {
      handleSearch(searchQuery, searchType);
    }
  };

  const isSearching = isLoadingMovies || isLoadingActors;
  const hasSearchQuery = searchQuery && searchType;
  const searchError = searchType === "movies" ? movieError : actorError;

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchSection onSearch={handleSearch} isSearching={isSearching} />

      {/* Search Results */}
      {hasSearchQuery && (
        <div className="mt-8">
          {searchError ? (
            <ErrorMessage
              message={`Failed to search ${searchType}. Please check your connection and try again.`}
              onRetry={handleRetrySearch}
            />
          ) : (
            <>
              {searchType === "movies" && (
                <MovieSearchResults
                  movies={movieResults || []}
                  isLoading={isLoadingMovies}
                  query={searchQuery}
                  error={movieError}
                  onRetry={handleRetrySearch}
                />
              )}
              {searchType === "actors" && (
                <ActorSearchResults
                  actors={actorResults || []}
                  isLoading={isLoadingActors}
                  query={searchQuery}
                  error={actorError}
                  onRetry={handleRetrySearch}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Popular Movies - only show when not searching */}
      {!hasSearchQuery && (
        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-bold text-white">Popular Movies</h2>
          <MovieGrid initialMovies={initialMovies} />
        </div>
      )}
    </div>
  );
}

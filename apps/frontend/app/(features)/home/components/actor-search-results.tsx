"use client";

import { BaseGrid, MediaCard, EmptyState, ErrorMessage, LoadingGrid } from "@movie-app/ui";
import { User } from "lucide-react";
import type { Actor } from "@movie-app/shared-types";

interface ActorSearchResultsProps {
  actors: Actor[];
  isLoading?: boolean;
  query?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export function ActorSearchResults({ actors, isLoading = false, query, error, onRetry }: ActorSearchResultsProps) {
  if (error) {
    return (
      <ErrorMessage
        message={`Failed to search actors${query ? ` for "${query}"` : ""}. Please try again.`}
        onRetry={onRetry}
      />
    );
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-white">Searching for actors...</h2>
        <LoadingGrid count={8} aspectRatio="aspect-[3/4]" />
      </div>
    );
  }

  if (!actors.length && query) {
    return (
      <EmptyState message={`No actors found for "${query}"`} icon={<User className="h-12 w-12 text-slate-500" />} />
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-white">
        {query ? `Actor Results for "${query}"` : "Actors"} ({actors.length})
      </h2>
      <BaseGrid
        items={actors}
        aspectRatio="aspect-[3/4]"
        renderItem={(actor) => (
          <MediaCard
            href={`/actors/${actor.id}`}
            title={actor.name}
            subtitle={actor.birthYear ? `Born: ${actor.birthYear}` : undefined}
            imageUrl={actor.image}
            aspectRatio="aspect-[3/4]"
            placeholder="👤"
          />
        )}
      />
    </div>
  );
}

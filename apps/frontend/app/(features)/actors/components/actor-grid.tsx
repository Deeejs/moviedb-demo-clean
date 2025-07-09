"use client";

import { BaseGrid, MediaCard, ErrorMessage } from "@movie-app/ui";
import { useActors } from "../hooks/use-actors";

export function ActorGrid() {
  const { data: response, isLoading, error } = useActors();
  const actors = response?.data || [];

  if (isLoading) {
    return <BaseGrid count={12} aspectRatio="aspect-[3/4]" />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load actors. Please try again later." />;
  }

  return (
    <BaseGrid
      items={actors}
      aspectRatio="aspect-[3/4]"
      renderItem={(actor) => (
        <MediaCard
          href={`/actors/${actor.id}`}
          title={actor.name}
          imageUrl={actor.image}
          aspectRatio="aspect-[3/4]"
          placeholder="👤"
        />
      )}
    />
  );
}

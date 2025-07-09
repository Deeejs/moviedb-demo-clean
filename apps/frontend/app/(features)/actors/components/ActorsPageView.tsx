"use client";

import { ActorGrid, EmptyState, PaginationControls } from "@movie-app/ui";
import { User } from "lucide-react";
import type { Actor } from "@movie-app/shared-types";

interface ActorsPageViewProps {
  actors: Actor[];
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function ActorsPageView({ actors, total, hasNextPage, hasPrevPage }: ActorsPageViewProps) {
  const actorGridItems =
    actors?.map((actor) => ({
      id: actor.id,
      name: actor.name,
      image: actor.image,
    })) || [];

  return (
    <div className="container mx-auto px-4 py-6 pb-16">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          All Actors <span className="text-slate-400">({total})</span>
        </h1>
      </div>

      {actorGridItems.length > 0 ? (
        <>
          <ActorGrid actors={actorGridItems} />
          <PaginationControls hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} />
        </>
      ) : (
        <EmptyState message="No actors found." icon={<User className="h-12 w-12 text-slate-500" />} />
      )}
    </div>
  );
}

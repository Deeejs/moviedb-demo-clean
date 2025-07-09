"use client";

import { ActorHeader } from "./ActorHeader";
import { ActorFilmography } from "./ActorFilmography";
import { ActorCharacterRoles } from "./ActorCharacterRoles";
import type { Actor } from "@movie-app/shared-types";

interface ActorDetailViewProps {
  actor: Actor;
}

export default function ActorDetailView({ actor }: ActorDetailViewProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <ActorHeader actor={actor} />

      {/* Filmography & Character Roles Section */}
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
          <ActorFilmography actor={actor} />
          <ActorCharacterRoles actor={actor} />
        </div>
      </div>
    </div>
  );
}

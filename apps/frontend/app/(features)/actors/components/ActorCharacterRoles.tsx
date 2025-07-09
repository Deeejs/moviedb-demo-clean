"use client";

import Image from "next/image";
import Link from "next/link";
import type { Actor, Movie } from "@movie-app/shared-types";

interface ActorCharacterRolesProps {
  actor: Actor;
}

export function ActorCharacterRoles({ actor }: ActorCharacterRolesProps) {
  if (!actor.castRoles || actor.castRoles.length === 0) {
    return null;
  }

  const validRoles = actor.castRoles.filter(
    (role): role is typeof role & { movie: Movie } => role.movie !== undefined && role.movie !== null
  );

  if (validRoles.length === 0) {
    return null;
  }

  return (
    <div className="xl:col-span-1">
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-white">Character Roles</h2>
      </div>
      <div className="space-y-4">
        {validRoles.map((role) => (
          <Link
            key={role.movieId}
            href={`/movies/${role.movieId}`}
            className="group block rounded-lg bg-slate-800 p-4 transition-colors hover:bg-slate-700"
          >
            <div className="flex items-center space-x-3">
              <div className="relative h-18 w-12 flex-shrink-0">
                <Image
                  src={role.movie?.poster || "/placeholder.svg?height=72&width=48&text=Poster"}
                  alt={role.movie?.title || "Movie poster"}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-green-400">
                  {role.movie?.title || "Unknown Movie"}
                </h3>
                <p className="text-xs text-slate-400">{role.movie?.year}</p>
                <p className="mt-1 text-xs text-slate-300">
                  as <span className="font-medium">{role.characterName}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

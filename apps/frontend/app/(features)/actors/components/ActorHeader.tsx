"use client";

import Image from "next/image";
import { Badge, Button } from "@movie-app/ui";
import { User, MapPin, Calendar, Film } from "lucide-react";
import type { Actor } from "@movie-app/shared-types";

interface ActorHeaderProps {
  actor: Actor;
}

export function ActorHeader({ actor }: ActorHeaderProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
      {/* Actor Photo */}
      <div className="lg:col-span-1">
        <div className="relative mx-auto aspect-[3/4] max-w-xs lg:mx-0">
          <Image
            src={actor.image || "/placeholder.svg?height=600&width=450&text=Actor+Photo"}
            alt={`${actor.name} photo`}
            fill
            className="rounded-lg object-cover shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Actor Info */}
      <div className="space-y-6 lg:col-span-2">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-white lg:text-5xl">{actor.name}</h1>
          <div className="flex flex-wrap gap-4 text-slate-300">
            {actor.birthYear && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Born {actor.birthYear}</span>
              </div>
            )}
            {actor.birthPlace && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{actor.birthPlace}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Film className="h-4 w-4" />
              <span>
                {actor.totalMovies} {actor.totalMovies === 1 ? "film" : "films"}
              </span>
            </div>
          </div>
        </div>

        {/* Known For */}
        {actor.knownFor && actor.knownFor.length > 0 && (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Known For</h3>
            <div className="flex flex-wrap gap-2">
              {actor.knownFor.map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-200">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Biography */}
        {actor.bio && (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Biography</h3>
            <p className="leading-relaxed text-slate-300">{actor.bio}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
            <User className="mr-2 h-4 w-4" />
            Follow
          </Button>
          <Button variant="outline" className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

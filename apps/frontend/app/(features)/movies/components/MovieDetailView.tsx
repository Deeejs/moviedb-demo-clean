"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Button, CastGrid, RatingChart } from "@movie-app/ui";
import { Star, Play, Heart, Bookmark, Share } from "lucide-react";
import type { Movie } from "@movie-app/shared-types";

interface MovieDetailViewProps {
  movie: Movie;
}

export default function MovieDetailView({ movie }: MovieDetailViewProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            src={movie.backdrop || "/placeholder.svg?height=800&width=1200&text=Movie+Backdrop"}
            alt={movie.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/20" />
        </div>

        <div className="relative container mx-auto px-4 py-2">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="relative mx-auto aspect-[2/3] max-w-xs lg:mx-0">
                <Image
                  src={movie.poster || "/placeholder.svg?height=600&width=400&text=Movie+Poster"}
                  alt={`${movie.title} poster`}
                  fill
                  className="rounded-lg object-cover shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="space-y-6 lg:col-span-2">
              <div>
                <h1 className="mb-2 text-4xl font-bold text-white lg:text-5xl">{movie.title}</h1>
                <p className="text-xl text-slate-300">
                  {movie.year} • Directed by {movie.director}
                </p>
                {movie.runtime && <p className="mt-1 text-slate-400">Runtime: {movie.runtime}</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre: string) => (
                  <Badge key={genre} variant="secondary" className="bg-slate-700 text-slate-200">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="max-w-3xl text-lg leading-relaxed text-slate-300">{movie.description}</p>

              <div className="flex flex-wrap gap-4">
                {movie.videoUrl && movie.videoUrl !== null && (
                  <Link
                    href={movie.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Trailer
                  </Link>
                )}
                <Button variant="outline" className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cast */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-white">Cast</h2>
            {movie.cast && movie.cast.length > 0 ? (
              <CastGrid
                cast={movie.cast.map((castMember) => ({
                  id: castMember.actor?.id || castMember.actorId,
                  name: castMember.actor?.name || "Unknown Actor",
                  character: castMember.characterName,
                  image: castMember.actor?.image,
                }))}
              />
            ) : (
              <p className="text-slate-400">No cast information available.</p>
            )}
          </div>

          {/* Ratings */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">Ratings</h2>
            <div className="rounded-lg bg-slate-800 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.floor(movie.rating) ? "fill-green-500 text-green-500" : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-white">{movie.rating.toFixed(1)}</span>
                </div>
                <span className="text-slate-400">{movie.totalRatings.toLocaleString()} ratings</span>
              </div>
              <RatingChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

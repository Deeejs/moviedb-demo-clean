import Image from "next/image";
import Link from "next/link";
import { BaseGrid } from "./base-grid";

export interface ActorGridItem {
  id: string;
  name: string;
  image?: string;
  birthYear?: number;
}

export interface ActorGridProps {
  actors: ActorGridItem[];
  isLoading?: boolean;
}

export function ActorGrid({ actors, isLoading }: ActorGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="mb-2 aspect-[3/4] rounded-lg bg-slate-800"></div>
            <div className="mb-1 h-4 rounded bg-slate-800"></div>
            <div className="h-3 w-1/2 rounded bg-slate-800"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <BaseGrid<ActorGridItem>
      items={actors}
      aspectRatio="aspect-[3/4]"
      renderItem={(actor) => (
        <Link key={actor.id} href={`/actors/${actor.id}`} className="group">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-800 transition-transform group-hover:scale-105">
            <Image
              src={actor.image || "/placeholder.svg?height=300&width=200&text=Actor+Photo"}
              alt={actor.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </div>
          <div className="mt-2">
            <h3 className="truncate text-sm font-medium text-white">{actor.name}</h3>
            {actor.birthYear && <p className="text-xs text-slate-400">Born {actor.birthYear}</p>}
          </div>
        </Link>
      )}
    />
  );
}

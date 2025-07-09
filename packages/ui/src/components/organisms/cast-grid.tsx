import Image from "next/image";
import Link from "next/link";

export interface CastMember {
  id: string;
  name: string;
  character: string;
  image?: string;
}

export interface CastGridProps {
  cast: CastMember[];
}

export function CastGrid({ cast }: CastGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cast.map((member) => (
        <Link key={member.id} href={`/actors/${member.id}`} className="group">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-800 transition-transform group-hover:scale-105">
            <Image
              src={member.image || "/placeholder.svg?height=200&width=150&text=Actor+Photo"}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </div>
          <div className="mt-2">
            <h4 className="truncate text-sm font-medium text-white">{member.name}</h4>
            <p className="truncate text-xs text-slate-400">{member.character}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

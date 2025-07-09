import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface MediaCardProps {
  href: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  aspectRatio: "aspect-[2/3]" | "aspect-[3/4]";
  placeholder?: string;
  overlay?: ReactNode;
}

export function MediaCard({ href, title, subtitle, imageUrl, aspectRatio, placeholder, overlay }: MediaCardProps) {
  return (
    <Link href={href} className="group">
      <div
        className={`relative ${aspectRatio} overflow-hidden rounded-lg bg-slate-800 transition-transform group-hover:scale-105`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-700">
            <span className="text-4xl text-slate-500">{placeholder || "📷"}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        {overlay}
      </div>
      <div className="mt-2">
        <h3 className="truncate text-sm font-medium text-white">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
    </Link>
  );
}

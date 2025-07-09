"use client";

import { usePathname } from "next/navigation";

export function useCurrentPage() {
  const pathname = usePathname();

  if (pathname.startsWith("/movies")) return "films";
  if (pathname.startsWith("/actors")) return "actors";
  return undefined;
}

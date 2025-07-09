import { LoadingGrid } from "../..";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MoviesLoadingPage() {
  return (
    <div className="container mx-auto px-4 py-6 pb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-slate-800"></div>
          <div className="h-4 w-32 animate-pulse rounded bg-slate-800"></div>
        </div>
        <Link href="/" className="inline-flex items-center text-slate-400 transition-colors hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <LoadingGrid count={12} aspectRatio="aspect-[3/4]" />

      {/* Pagination loading */}
      <div className="mt-8 flex w-full justify-center gap-4">
        <div className="h-10 w-20 animate-pulse rounded bg-slate-800"></div>
        <div className="h-10 w-20 animate-pulse rounded bg-slate-800"></div>
      </div>
    </div>
  );
}

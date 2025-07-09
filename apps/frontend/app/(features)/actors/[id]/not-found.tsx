import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@movie-app/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-slate-300">Actor Not Found</h2>
        <p className="mb-8 text-slate-400">The actor you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button asChild>
          <Link href="/actors" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Actors
          </Link>
        </Button>
      </div>
    </div>
  );
}

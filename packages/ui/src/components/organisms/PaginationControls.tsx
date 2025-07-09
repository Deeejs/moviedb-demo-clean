"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../atoms/button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function PaginationControls({ hasNextPage, hasPrevPage }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex w-full justify-center gap-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600"
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600"
      >
        Next
      </Button>
    </div>
  );
}

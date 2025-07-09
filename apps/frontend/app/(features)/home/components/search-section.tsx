"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Search, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SearchInput, Button } from "@movie-app/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@movie-app/ui";

interface SearchSectionProps {
  onSearch: (query: string, type: "movies" | "actors") => void;
  isSearching?: boolean;
}

export function SearchSection({ onSearch, isSearching = false }: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<"movies" | "actors">("movies");
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    if (Math.abs(window.innerWidth - 768) < 100) {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  // Debounced search function
  const performSearch = useCallback(
    (searchQuery: string, type: "movies" | "actors") => {
      onSearch(searchQuery, type);
    },
    [onSearch]
  );

  // Auto-search when user stops typing (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;

    const timeoutId = setTimeout(() => {
      performSearch(query.trim(), searchType);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, searchType, performSearch, isMobile]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim(), searchType);
    }
  };

  const handleClear = () => {
    setQuery("");
    performSearch("", searchType);
  };

  return (
    <div className="mb-8 text-center">
      {/* Hero Section */}
      <div className={isMobile ? "mb-3" : "mb-6"}>
        <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">Discover Movies</h1>
        <p className="mb-4 text-xl text-slate-400">Explore our collection of films and actors</p>
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/movies"
            className="rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
          >
            Browse All Movies
          </Link>
          <Link
            href="/actors"
            className="rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
          >
            Browse All Actors
          </Link>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mx-auto max-w-4xl">
        <div className="flex flex-col items-stretch gap-3 md:flex-row">
          {/* Search Input */}
          <SearchInput
            placeholder="Search movies or actors..."
            value={query}
            onChange={setQuery}
            onClear={handleClear}
            isLoading={isSearching}
            icon={<Search className="h-5 w-5" />}
            className="flex-1"
          />

          {/* Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-14 min-w-32 justify-between rounded-xl border-slate-600 bg-slate-800/50 px-6 text-white hover:bg-slate-700"
              >
                {searchType === "movies" ? "Movies" : "Actors"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-32 border-slate-600 bg-slate-800" align="center" sideOffset={4}>
              <DropdownMenuItem
                onClick={() => setSearchType("movies")}
                className="cursor-pointer text-white hover:bg-slate-700"
              >
                Movies
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSearchType("actors")}
                className="cursor-pointer text-white hover:bg-slate-700"
              >
                Actors
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Button */}
          <Button
            type="submit"
            className="h-14 rounded-xl bg-orange-600 px-8 font-semibold text-white hover:bg-orange-700 disabled:opacity-50 md:hidden"
            disabled={isSearching || !query.trim()}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

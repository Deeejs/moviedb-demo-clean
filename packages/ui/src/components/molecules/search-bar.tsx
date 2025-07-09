"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "../atoms/input";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
      setQuery(""); // Clear the search bar after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
      <Input
        type="search"
        placeholder="Search films and actors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 border-slate-700 bg-slate-800 pl-10 text-white placeholder-slate-400 focus:border-slate-500"
      />
    </form>
  );
}

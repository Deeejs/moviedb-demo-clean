"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  currentPage?: "films" | "actors";
  rightContent?: ReactNode;
  mobileRightContent?: ReactNode;
}

export function Header({ currentPage = "films", rightContent, mobileRightContent }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-white transition-opacity hover:opacity-80">
              <span className="text-orange-500">●</span>
              <span className="text-green-500">●</span>
              <span className="text-blue-500">●</span> MovieDB
            </Link>
            <nav className="hidden items-center space-x-6 md:flex">
              <Link
                href="/movies"
                className={`transition-colors ${currentPage === "films" ? "font-medium text-white" : "text-slate-300 hover:text-white"}`}
              >
                FILMS
              </Link>
              <Link
                href="/actors"
                className={`transition-colors ${currentPage === "actors" ? "font-medium text-white" : "text-slate-300 hover:text-white"}`}
              >
                ACTORS
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {rightContent && <div className="flex items-center">{rightContent}</div>}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 transition-colors hover:text-white md:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 border-t border-slate-800 pt-3 pb-3 md:hidden">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/movies"
                className={`py-2 text-lg transition-colors ${currentPage === "films" ? "font-medium text-white" : "text-slate-300 hover:text-white"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FILMS
              </Link>
              <Link
                href="/actors"
                className={`py-2 text-lg transition-colors ${currentPage === "actors" ? "font-medium text-white" : "text-slate-300 hover:text-white"}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ACTORS
              </Link>
              {mobileRightContent && <div className="border-t border-slate-700 pt-3">{mobileRightContent}</div>}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

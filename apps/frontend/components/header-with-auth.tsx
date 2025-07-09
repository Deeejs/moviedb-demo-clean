"use client";

import { Header, BackButton } from "@movie-app/ui";
import { useCurrentPage } from "../hooks/use-current-page";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";

export function HeaderWithAuth() {
  const currentPage = useCurrentPage();
  const pathname = usePathname();

  // Determine if we should show a back button based on the route
  const getBackButton = () => {
    if (pathname.startsWith("/actors/") && pathname !== "/actors") {
      return <BackButton href="/actors" label="Back to Actors" />;
    }
    if (pathname.startsWith("/movies/") && pathname !== "/movies") {
      return <BackButton href="/movies" label="Back to Movies" />;
    }
    if (pathname === "/actors") {
      return <BackButton href="/" label="Back to Home" />;
    }
    if (pathname === "/movies") {
      return <BackButton href="/" label="Back to Home" />;
    }
    return null;
  };

  const backButton = getBackButton();

  return (
    <Header
      currentPage={currentPage}
      rightContent={
        <div className="flex items-center gap-4 md:gap-12 lg:gap-24">
          {backButton && <div className="text-sm md:text-base">{backButton}</div>}
          <div className="hidden md:block">
            <LogoutButton />
          </div>
        </div>
      }
      mobileRightContent={<LogoutButton />}
    />
  );
}

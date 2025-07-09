"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-md bg-red-600/20 px-3 py-2 text-sm text-red-400 transition-all hover:bg-red-600/30 hover:text-red-300"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}

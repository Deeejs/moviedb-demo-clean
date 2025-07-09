"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "../lib/query-client";
import { AuthProvider } from "../contexts/auth-context";
import AuthWrapper from "../components/auth-wrapper";
import { HeaderWithAuth } from "../components/header-with-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthWrapper>
          <div className="min-h-screen bg-slate-900">
            <HeaderWithAuth />
            <main>{children}</main>
          </div>
        </AuthWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

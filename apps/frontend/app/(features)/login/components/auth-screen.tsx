"use client";

import type React from "react";

import { AuthBackground } from "./auth-background";
import { AuthHeader } from "./auth-header";
import { AuthForm } from "./auth-form";
import { AuthFooter } from "./auth-footer";

export default function AuthScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6 lg:p-8">
      <AuthBackground />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md">
        <AuthHeader />
        <AuthForm />
        <AuthFooter />
      </div>
    </div>
  );
}

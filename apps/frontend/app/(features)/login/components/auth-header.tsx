"use client";

import type React from "react";

export function AuthHeader() {
  return (
    <div className="animate-fade-in mb-6 text-center sm:mb-8">
      <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4">
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-500 sm:h-3 sm:w-3"></div>
          <div
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-500 sm:h-3 sm:w-3"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 sm:h-3 sm:w-3"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">MovieDB</h1>
      </div>
      <p className="text-sm text-slate-400 sm:text-base">Welcome back to your movie universe</p>
    </div>
  );
}

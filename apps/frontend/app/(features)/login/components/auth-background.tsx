"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Film, Star, Play, Users, type LucideIcon } from "lucide-react";

export function AuthBackground() {
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; y: number; icon: LucideIcon; delay: number }>
  >([]);

  useEffect(() => {
    const icons: LucideIcon[] = [Film, Star, Play, Users];
    const elementCount = window.innerWidth < 768 ? 6 : 12;
    const elements = Array.from({ length: elementCount }, (_, i) => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: icons[randomIndex] as LucideIcon,
        delay: Math.random() * 5,
      };
    });
    setFloatingElements(elements);
  }, []);

  return (
    <>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <div
              key={element.id}
              className="animate-float absolute opacity-10"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            >
              <IconComponent className="h-6 w-6 text-orange-500 sm:h-8 sm:w-8" />
            </div>
          );
        })}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 h-48 w-48 animate-pulse rounded-full bg-orange-500/20 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96"></div>
      <div
        className="absolute right-1/4 bottom-1/4 h-48 w-48 animate-pulse rounded-full bg-blue-500/20 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96"
        style={{ animationDelay: "2s" }}
      ></div>
    </>
  );
}

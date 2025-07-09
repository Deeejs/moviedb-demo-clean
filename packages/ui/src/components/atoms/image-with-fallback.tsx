"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string;
  showLoadingSpinner?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  showLoadingSpinner = true,
  className = "",
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading State */}
      {isLoading && showLoadingSpinner && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-800">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-slate-400"></div>
        </div>
      )}

      {/* Error State */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-slate-800 text-slate-400">
          <ImageIcon className="mb-2 h-8 w-8" />
          <span className="px-2 text-center text-xs">Failed to load image</span>
        </div>
      )}

      {/* Image */}
      {!hasError && (
        <Image
          {...props}
          src={imgSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

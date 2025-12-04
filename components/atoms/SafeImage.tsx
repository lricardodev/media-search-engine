"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Film } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackClassName?: string;
}

export const SafeImage = ({
  src,
  alt,
  fallbackClassName = "bg-gray-200 text-gray-400",
  ...props
}: SafeImageProps) => {
  const [error, setError] = useState(false);

  if (error || !src || src === "N/A") {
    return (
      <div
        className={`w-full h-full flex items-center justify-center ${fallbackClassName}`}
      >
        <Film className="w-12 h-12 opacity-50" />
      </div>
    );
  }

  return (
    <Image src={src} alt={alt} onError={() => setError(true)} {...props} />
  );
};

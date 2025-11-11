"use client";

import * as React from "react";
import Thumb from "@/components/ui/Thumb";
import ZoomImage from "@/components/ui/ZoomImage";
import { UiImage } from "@/types/product";
import { StaticImageData } from "next/image";

type GalleryProps = {
  /** The images to display (variant-specific) */
  images: UiImage[];
  /** Product title (for alt text, etc.) */
  title: string;
  /** Product code for small meta display */
  code?: string;
  /** Active main image source */
  activeImage?: string | StaticImageData;
  /** Index of the active image */
  activeIndex: number;
  /** Callback when thumbnail is clicked */
  onThumbClick: (i: number) => void;
};

export default function ProductGallery({
  images,
  title,
  code,
  activeImage,
  activeIndex,
  onThumbClick,
}: GalleryProps) {
  // graceful fallback
  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <div className="flex gap-4">
      {/* Thumbs (sticky on large screens) */}
      <div className="hidden flex-col gap-3 md:flex lg:sticky lg:top-6">
        {hasImages ? (
          images.map((img, i) => (
            <Thumb
              key={i}
              src={typeof img.src === "string" ? img.src : ""}
              alt={`${title} - ${i + 1}`}
              active={i === activeIndex}
              onClick={() => onThumbClick(i)}
            />
          ))
        ) : (
          <div className="text-xs text-neutral-400">No images</div>
        )}
      </div>

      {/* Main image */}
      <div className="flex-1">
        {hasImages && activeImage && (
          <ZoomImage
            src={typeof activeImage === "string" ? activeImage : ""}
            alt={title}
            zoom={2.4}
            className="aspect-[4/3] w-full rounded-2xl"
          />
        )}

        {/* Mobile thumbs */}
        <div className="mt-3 flex gap-3 overflow-x-auto md:hidden">
          {hasImages &&
            images.map((img, i) => (
              <Thumb
                key={i}
                src={typeof img.src === "string" ? img.src : ""}
                alt={`${title} - ${i + 1}`}
                active={i === activeIndex}
                onClick={() => onThumbClick(i)}
              />
            ))}
        </div>

        {/* Code meta */}
        {code && (
          <div className="mt-3 text-xs text-neutral-500">
            CODE: <span className="font-medium">{code}</span>
          </div>
        )}
      </div>
    </div>
  );
}

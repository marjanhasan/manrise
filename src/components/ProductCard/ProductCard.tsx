"use client";
import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  imageFront: string;
  imageBack: string;
  title: string;
  code: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  imageFront,
  imageBack,
  title,
  code,
  price,
  oldPrice,
  rating,
  reviews,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] w-full">
        {/* Main image */}
        <Image
          src={imageFront}
          alt={title}
          fill
          className={`object-cover transition-opacity duration-500 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Hover image */}
        <Image
          src={imageBack}
          alt={title}
          fill
          className={`absolute top-0 left-0 object-cover transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* ⭐ Rating badge inside image */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[clamp(10px,0.9vw,13px)] shadow-sm backdrop-blur-sm">
          <Star className="h-[clamp(12px,1vw,15px)] w-[clamp(12px,1vw,15px)] fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-gray-500">
            | {reviews.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1.5 p-3">
        {/* Title */}
        <h3 className="text-[clamp(11px,1vw,14px)] leading-tight font-semibold text-gray-800">
          {title} | {code}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1 text-[clamp(13px,1.2vw,16px)] font-semibold text-gray-800">
          <span>TK. {price}</span>
          <span className="text-[clamp(10px,0.9vw,12px)] font-normal text-gray-400 line-through">
            TK. {oldPrice}
          </span>
        </div>

        {/* Add To Cart */}
        <button className="mt-1.5 w-full rounded-lg bg-gray-100 py-[clamp(6px,0.7vw,8px)] text-[clamp(11px,1vw,13px)] font-medium text-gray-800 transition hover:bg-gray-200">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

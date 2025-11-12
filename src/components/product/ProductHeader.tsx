"use client";
import * as React from "react";
import { Star } from "lucide-react";

type HeaderProps = {
  title: string;
  rating: number;
  reviewCount: number;
  price: string;
  compareAt?: string;
  bestSeller: boolean;
};
export default function ProductHeader({
  title,
  bestSeller,
  rating,
  reviewCount,
  price,
  compareAt,
}: HeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl leading-snug font-semibold">{title}</h1>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1 text-amber-500"
          aria-label={`${rating.toFixed(1)} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const full = i + 1 <= Math.floor(rating);
            const half = !full && rating > i && rating < i + 1;
            return (
              <div key={i} className="relative h-4 w-4">
                <Star className="absolute inset-0 h-4 w-4 text-amber-400 opacity-30" />
                {full && (
                  <Star className="absolute inset-0 h-4 w-4 fill-amber-400 text-amber-400" />
                )}
                {half && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${(rating - i) * 100}%` }}
                  >
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <span className="text-sm text-neutral-600 dark:text-neutral-300">
          {rating.toFixed(1)} | {reviewCount} Reviews
        </span>
        {bestSeller && (
          <span className="cursor-pointer rounded-full border border-transparent bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 px-2 py-0.5 text-xs font-semibold text-white transition-all duration-300 dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black">
            Best Seller
          </span>
        )}
      </div>

      <div className="flex items-end gap-3">
        <div className="text-3xl font-semibold">{price}</div>
        {compareAt && (
          <div className="text-neutral-500 line-through">{compareAt}</div>
        )}
      </div>
    </header>
  );
}

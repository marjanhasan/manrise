"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { RelatedItem as ProductCardProps } from "@/types/product";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({
  productId,
  images,
  title,
  code,
  price,
  compareAtPrice,
  rating,
  reviewCount,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);

  return (
    <Link
      href={`/product/${productId}`}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {/* Base image layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${hovered ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src={images.front.src}
            alt={title}
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Hover image layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={images.back.src}
            alt={title}
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* ⭐ Rating badge — keep above images */}
        <div className="absolute bottom-2 left-2 z-30 flex items-center gap-1 rounded-md bg-white/80 px-2 py-1 text-[clamp(10px,0.9vw,13px)] shadow-sm backdrop-blur-sm dark:bg-black/40">
          <Star className="h-[clamp(12px,1vw,15px)] w-[clamp(12px,1vw,15px)] fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-gray-500">
            | {reviewCount.toString().padStart(2, "0")}
          </span>
        </div>

        {/* ❤ Wishlist — keep above images */}
        <motion.button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault(); // prevents Link navigation when clicking the button
            setWished((v) => !v);
          }}
          className="absolute top-2 right-2 z-30 grid h-[clamp(42px,5vw,50px)] w-[clamp(42px,5vw,50px)] place-items-center rounded-full text-gray-700 transition-transform duration-300 hover:scale-[1.1] active:scale-[0.95] dark:text-gray-200"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={wished ? "filled" : "empty"}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <Heart
                className={`h-[clamp(20px,2.4vw,26px)] w-[clamp(20px,2.4vw,26px)] cursor-pointer transition-all duration-300 ${
                  wished
                    ? "fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600 dark:fill-red-400 dark:text-red-400 dark:hover:fill-red-500 dark:hover:text-red-500"
                    : "fill-none hover:fill-red-500 hover:text-red-500 dark:hover:fill-red-400 dark:hover:text-red-400"
                }`}
              />
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1.5 p-3">
        {/* Title */}
        <h3 className="text-[clamp(11px,1vw,14px)] leading-tight font-semibold text-gray-800 dark:text-white">
          {title} | {code}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-1 text-[clamp(13px,1.2vw,16px)] font-semibold text-gray-800 dark:text-white">
          <span>TK. {price}</span>
          <span className="text-[clamp(10px,0.9vw,12px)] font-normal text-gray-400 line-through">
            TK. {compareAtPrice}
          </span>
        </div>

        {/* Actions: Buy Now (fluid) + Cart (aligned) */}
        <div className="mt-1.5 flex w-full items-stretch gap-2">
          {/* Buy Now */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Buy Now");
            }}
            className="min-h-[clamp(28px,3vw,36px)] flex-1 cursor-pointer rounded-xl bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 px-[clamp(8px,2vw,12px)] text-[clamp(11px,0.95vw,13px)] font-semibold text-white shadow-[0_0_10px_#00000022,0_0_18px_#00000011] transition-all duration-300 hover:scale-[1.02] hover:from-gray-600 hover:via-gray-400 hover:to-gray-600 hover:shadow-[0_0_18px_#00000033,0_0_30px_#00000022] active:scale-[0.98]" /* less tall overall */
          >
            Buy Now
          </button>

          {/* Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Add to cart");
            }}
            aria-label="Add to Cart"
            className="flex aspect-square h-[clamp(26px,2.8vw,34px)] shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-gray-600 text-gray-700 shadow-sm transition-all duration-300 hover:scale-[1.05] hover:border-gray-700 hover:text-gray-800 active:scale-95 dark:border-gray-300 dark:text-gray-200 dark:hover:border-gray-200 dark:hover:text-gray-100"
          >
            <ShoppingCart className="h-[clamp(13.5px,1vw,16.5px)] w-[clamp(13.5px,1vw,16.5px)] stroke-[2.25]" />
          </button>
        </div>
      </div>
    </Link>
  );
}

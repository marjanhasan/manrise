"use client";

import * as React from "react";
import img1 from "../../../../../public/imageFront.webp";
import img2 from "../../../../../public/imageBack.webp";
import {
  Star,
  Phone,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Share2,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { StaticImageData } from "next/image";

/** ----------------------- Dummy product ----------------------- */
const DUMMY = {
  title: "Winter Special 8 Pocket Baggy Denim Pant | MPANT-21",
  price: 1190,
  oldPrice: 1990,
  rating: 3.7,
  reviews: 21,
  code: "MPANT-21",
  stock: 86,
  color: "Black",
  colors: ["Black", "Blue"],
  sizes: ["S", "M", "L", "XL"],
  images: [
    // Replace with your real images.
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop",
  ],
};

interface RelatedItem {
  imageFront: string | StaticImageData;
  imageBack: string | StaticImageData;
  title: string;
  code: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
}

const products: RelatedItem[] = [
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
  {
    imageFront: img1,
    imageBack: img2,
    title: "Manfare ELITE Quality Panjabi",
    code: "MP-242",
    price: 2990,
    oldPrice: 3750,
    rating: 5.0,
    reviews: 1,
  },
];

/** ----------------------- Zoomable image -----------------------
 * Inner-zoom pattern (like Zara/Nike): the same image is set as a background,
 * scaled up and panned with mouse position. Works with any image URL.
 */
function ZoomImage({
  src,
  alt,
  zoom = 2.2,
  className = "",
  radius = "1rem",
}: {
  src: string;
  alt: string;
  zoom?: number;
  className?: string;
  radius?: string;
}) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = React.useState(false); // desktop hover
  const [touching, setTouching] = React.useState(false); // mobile press
  const [bgPos, setBgPos] = React.useState("50% 50%");

  const setPositionFromPoint = (clientX: number, clientY: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    // clamp 0–100 to avoid overscroll bands
    const clamp = (v: number) => Math.max(0, Math.min(100, v));
    setBgPos(`${clamp(x)}% ${clamp(y)}%`);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    setPositionFromPoint(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouching(true);
    const t = e.touches[0];
    if (t) setPositionFromPoint(t.clientX, t.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) setPositionFromPoint(t.clientX, t.clientY);
  };

  const onTouchEnd = () => {
    setTouching(false);
  };

  const isZoomed = hovered || touching;

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      className={`/* responsive aspect ratio */ relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 md:aspect-[4/3] dark:bg-neutral-900 ${className} `}
      style={{
        borderRadius: radius,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: isZoomed ? bgPos : "center",
        backgroundSize: isZoomed ? `${zoom * 100}%` : "cover",
        transition: "background-size 150ms ease-out, transform 150ms ease-out",
        // prevents iOS rubber-band when panning inside
        touchAction: "none",
      }}
      aria-label={alt}
      role="img"
    >
      {/* Fallback <img> for SEO/lazy load; hidden while zoomed */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`pointer-events-none h-full w-full object-cover transition-opacity duration-150 ${
          isZoomed ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />

      {/* Optional: subtle overlay while zoomed */}
      {isZoomed && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" />
      )}
    </div>
  );
}

/** ----------------------- Thumbnail rail ----------------------- */
function Thumb({
  src,
  active,
  onClick,
  alt,
}: {
  src: string;
  active?: boolean;
  alt: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative aspect-square w-16 overflow-hidden rounded-xl border transition ${
        active
          ? "border-black shadow-sm dark:border-white"
          : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
      }`}
      aria-pressed={active}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {active && (
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-black/60 dark:ring-white/70" />
      )}
    </button>
  );
}

function TabSection() {
  const [tab, setTab] = React.useState<"description" | "delivery">(
    "description",
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-6 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => setTab("description")}
          className={`pb-3 text-sm font-medium tracking-wide uppercase transition ${
            tab === "description"
              ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-white dark:text-white"
              : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => setTab("delivery")}
          className={`pb-3 text-sm font-medium tracking-wide uppercase transition ${
            tab === "delivery"
              ? "border-b-2 border-neutral-900 text-neutral-900 dark:border-white dark:text-white"
              : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white"
          }`}
        >
          DELIVERY OPTIONS
        </button>
      </div>

      {/* ------------------ TAB CONTENT ------------------ */}
      {tab === "description" ? (
        <div className="space-y-6 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {/* Size chart */}
          <div>
            <h3 className="mb-2 text-base font-semibold">Size Chart:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-neutral-200 text-xs dark:border-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    {[
                      "Size",
                      "Chest Round",
                      "Length",
                      "Shoulder",
                      "Sleeve",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-4 py-2 text-left font-medium text-neutral-800 dark:text-neutral-100"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["40 (M)", `39.5"`, `40"`, `16.5"`, `23.5"`],
                    ["42 (L)", `39.5"`, `40"`, `16.5"`, `23.5"`],
                    ["44 (XL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
                    ["46 (XXL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-neutral-200 dark:border-neutral-700"
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Size chart - In inches (Expected Deviation &lt; 2%)
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-base font-semibold">
              Winter Men’s Baggy Denim Jeans by ManRise
            </h3>
            <p className="text-justify">
              Step into effortless style with Manfare’s{" "}
              <strong>winter premium baggy denim jeans</strong>. Crafted for
              everyday comfort and modern streetwear appeal, this pair balances
              durability, smooth hand-feel, and versatile styling. Finished with
              ManRise-branded details and quality stitching, it’s built to be
              your go-to essential.
            </p>
          </div>

          {/* Fabric & Fit — added from client */}
          <div>
            <h4 className="mb-1 font-semibold">Fabric &amp; Fit</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium">Fabric Type:</span> Premium
                Imported Mixed Cotton
              </li>
              <li>
                <span className="font-medium">Type:</span> Slim Fit
              </li>
              <li>
                <span className="font-medium">Weave:</span> Plain weave
              </li>
              <li>
                <span className="font-medium">Texture:</span> Soft and smooth
                with a matte finish
              </li>
              <li>
                <span className="font-medium">Breathability:</span> Highly
                breathable and comfortable
              </li>
            </ul>
          </div>

          {/* Specs (kept, trimmed to avoid conflicts) */}
          <div>
            <h4 className="mb-1 font-semibold">Specifications:</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>ManRise-branded button and rivet details</li>
              <li>Classic multi-pocket baggy design with modern comfort</li>
              <li>
                Straight fit silhouette that’s easy to style for any occasion
              </li>
              <li>Quality stitching for long-lasting wear</li>
            </ul>
          </div>

          {/* Care — replaced with client’s Care Tips */}
          <div>
            <h4 className="mb-1 font-semibold">Care Tips</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Wash in cold water to keep the fabric’s elegance.</li>
              <li>Avoid bleach to maintain the fabric’s brightness.</li>
              <li>Iron on medium heat to keep it looking fresh.</li>
              <li>Do not iron over any embroidered areas.</li>
              <li>Do not iron over label or the buttons.</li>
            </ul>
          </div>

          {/* Brand (kept as-is) */}
          <div>
            <h4 className="mb-1 font-semibold">About the Brand – ManRise</h4>
            <p className="text-justify">
              <strong>ManRise</strong> is a premium Bangladeshi menswear brand
              dedicated to creating timeless pieces with uncompromising quality.
              From everyday essentials to statement styles, our designs combine{" "}
              <em>modern fashion with premium craftsmanship</em>. Every product
              is crafted with attention to detail, ensuring comfort, durability,
              and effortless style for the modern man.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-justify text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            <strong>ঢাকা সিটি - হোম ডেলিভারি - ৭০ টাকা</strong>
          </p>
          <p>
            ঢাকা সিটি এর ভেতরে অর্ডার করা হলে আমরা সাধারণত ১-২ দিনের মধ্যে
            ডেলিভারি করি। নির্দিষ্ট এলাকাভেদে সময় ভিন্ন হতে পারে।
          </p>
          <p>
            <strong>
              ঢাকার বাইরে - সারা বাংলাদেশ - হোম ডেলিভারি বা কুরিয়ার অফিস - ১২০
              টাকা
            </strong>
          </p>
          <p>
            ঢাকার বাইরের অর্ডারগুলো আমরা কুরিয়ার সার্ভিসের মাধ্যমে পাঠিয়ে
            থাকি। সাধারণত ২-৫ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। ডেলিভারির
            সময় পণ্য হাতে পেয়ে মূল্য পরিশোধ করতে পারবেন।
          </p>
          <p>
            কুরিয়ার অফিস থেকে পণ্য গ্রহণ করতে চাইলে অর্ডার করার সময় সেই অপশনটি
            নির্বাচন করতে পারবেন।
          </p>
        </div>
      )}
    </div>
  );
}

function RelatedProducts({ products }: { products: RelatedItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard
          key={i}
          imageFront={p.imageFront}
          imageBack={p.imageBack}
          title={p.title}
          code={p.code}
          price={p.price}
          oldPrice={p.oldPrice}
          rating={p.rating}
          reviews={p.reviews}
        />
      ))}
    </div>
  );
}

/** ----------------------- Page ----------------------- */
export default function ProductDetailsPage() {
  const p = DUMMY;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [size, setSize] = React.useState<string | null>("M");
  const [color, setColor] = React.useState<string>(p.color);
  const [qty, setQty] = React.useState(1);

  const activeImage = p.images[activeIndex];

  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => Math.min(99, n + 1));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT: gallery */}
        <div className="flex gap-4">
          {/* Thumbs (sticky on large) */}
          <div className="hidden flex-col gap-3 md:flex lg:sticky lg:top-6">
            {p.images.map((src, i) => (
              <Thumb
                key={i}
                src={src}
                alt={`${p.title} - ${i + 1}`}
                active={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1">
            <ZoomImage
              src={activeImage}
              alt={p.title}
              zoom={2.4}
              className="aspect-[4/3] w-full rounded-2xl"
            />

            {/* Mobile thumbs */}
            <div className="mt-3 flex gap-3 overflow-x-auto md:hidden">
              {p.images.map((src, i) => (
                <Thumb
                  key={i}
                  src={src}
                  alt={`${p.title} - ${i + 1}`}
                  active={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>

            {/* Code QR / small meta (placeholder) */}
            <div className="mt-3 text-xs text-neutral-500">
              CODE: <span className="font-medium">{p.code}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: details */}
        <div className="space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl leading-snug font-semibold">{p.title}</h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => {
                  const full = i + 1 <= Math.floor(p.rating);
                  const half = !full && p.rating > i && p.rating < i + 1;
                  return (
                    <div key={i} className="relative h-4 w-4">
                      {/* Empty outline star */}
                      <Star className="absolute inset-0 h-4 w-4 text-amber-400 opacity-30" />
                      {/* Filled portion */}
                      {full && (
                        <Star className="absolute inset-0 h-4 w-4 fill-amber-400 text-amber-400" />
                      )}
                      {half && (
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${(p.rating - i) * 100}%` }}
                        >
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-300">
                {p.rating.toFixed(1)} | {p.reviews} Reviews
              </span>
            </div>

            <div className="flex items-end gap-3">
              <div className="text-3xl font-semibold">TK. {p.price}</div>
              {p.oldPrice && (
                <div className="text-neutral-500 line-through">
                  TK. {p.oldPrice}
                </div>
              )}
            </div>
          </header>

          <hr className="border-neutral-200 dark:border-neutral-800" />

          {/* Color */}
          <section className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">COLOR:</span>{" "}
              <span className="text-neutral-600 dark:text-neutral-300">
                {color}
              </span>
            </div>
            <div className="flex gap-2">
              {p.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`cursor-pointer rounded-xl border px-2.5 py-1.5 text-sm font-medium text-gray-800 shadow-md transition-all duration-300 ${
                    color === c
                      ? // 🌈 Active: premium gradient + glow
                        "border-transparent bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black"
                      : // ⚪ Inactive: simple bordered neutral (no gradient)
                        "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          {/* Size */}
          <section className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">SIZE:</span>{" "}
              {size ? (
                <span className="text-neutral-600 dark:text-neutral-300">
                  {size}
                </span>
              ) : (
                <span className="text-red-600">Select a size</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => {
                const active = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`cursor-pointer rounded-xl border px-3 py-1.5 text-sm font-medium text-gray-800 shadow-md transition-all duration-300 ${
                      active
                        ? // 🌈 Active: gradient glow style
                          "border-transparent bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black"
                        : // ⚪ Inactive: clean bordered neutral
                          "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
                    }`}
                    aria-pressed={active}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              {p.stock} available
            </div>
          </section>

          {/* Qty + actions */}
          <section className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Quantity selector */}
              <div className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={dec}
                  className="grid h-10 w-10 cursor-pointer place-items-center"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2.5rem] text-center text-sm font-medium select-none">
                  {qty}
                </span>
                <button
                  onClick={inc}
                  className="grid h-10 w-10 cursor-pointer place-items-center"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => console.log("Add to cart", { qty, size, color })}
                className="w-full cursor-pointer rounded-xl bg-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:bg-neutral-300 hover:shadow-[0_0_10px_#00000022] sm:flex-1 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
              >
                Add To Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={() => console.log("Buy now")}
                className="w-full cursor-pointer rounded-xl bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] transition-all duration-300 hover:scale-[1.02] hover:from-gray-600 hover:via-gray-400 hover:to-gray-600 hover:shadow-[0_0_20px_#00000044,0_0_35px_#00000033] active:scale-[0.99] sm:flex-1"
              >
                Buy Now
              </button>
            </div>

            {/* Call now */}
            <button
              onClick={() => (window.location.href = "tel:+8809606999695")}
              className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900"
            >
              <Phone className="h-5 w-5 shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="font-semibold">+880 9606999695</span>
                <span className="rounded-lg border-transparent bg-neutral-900 bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 px-2 py-0.5 text-xs font-semibold text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black">
                  CALL US NOW
                </span>
              </div>
            </button>

            <div className="flex flex-col gap-4 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              {/* Wishlist Button */}
              <button className="inline-flex cursor-pointer items-center gap-2 text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
                <Heart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-medium">ADD TO WISHLIST</span>
              </button>

              {/* Share Buttons */}
              <div className="flex flex-wrap items-center justify-start gap-3 text-neutral-600 sm:justify-end dark:text-neutral-300">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Share2 className="h-4 w-4" /> Share To:
                </span>
                <a
                  href="#"
                  className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_10px_#00000033,0_0_20px_#00000022] dark:hover:from-gray-300 dark:hover:via-gray-400 dark:hover:to-gray-200 dark:hover:text-black"
                  aria-label="Share to Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_10px_#00000033,0_0_20px_#00000022] dark:hover:from-gray-300 dark:hover:via-gray-400 dark:hover:to-gray-200 dark:hover:text-black"
                  aria-label="Share to Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_10px_#00000033,0_0_20px_#00000022] dark:hover:from-gray-300 dark:hover:via-gray-400 dark:hover:to-gray-200 dark:hover:text-black"
                  aria-label="Share to Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Small badges / guarantees */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {["100% Authentic", "7-Day Easy Return", "Cash on Delivery"].map(
              (t) => (
                <div
                  key={t}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-700"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full border-transparent bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </div>
              ),
            )}
          </section>
        </div>
      </div>

      {/* ------------------ DESCRIPTION / DELIVERY OPTIONS ------------------ */}
      <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <TabSection />
      </section>

      {/* ------------------ RELATED PRODUCTS ------------------ */}
      <section className="mt-14">
        <div className="mb-6">
          <h2 className="text-center text-xl font-semibold tracking-wide">
            RELATED PRODUCTS
          </h2>
          <div className="relative mt-2">
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="absolute top-0 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full border-transparent bg-neutral-900 bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200" />
          </div>
        </div>

        <RelatedProducts products={products} />
      </section>

      {/* ------------------ YOU MAY ALSO LIKE ------------------ */}
      <section className="mt-14">
        <div className="mb-6">
          <h2 className="text-center text-xl font-semibold tracking-wide">
            YOU MAY ALSO LIKE
          </h2>
          <div className="relative mt-2">
            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="absolute top-0 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full border-transparent bg-neutral-900 bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200" />
          </div>
        </div>

        <RelatedProducts products={products} />
      </section>
    </main>
  );
}

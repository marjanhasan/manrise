"use client";

import * as React from "react";
import img1 from "../../../../public/imageFront.webp";
import img2 from "../../../../public/imageBack.webp";
import { PremiumDropdown } from "@/components/PremiumDropdown";
import ProductCard from "@/components/ProductCard/ProductCard";

/**
 * Drop this into: app/products/page.tsx
 *
 * Notes:
 * - Uses your dummy array below (replace later with API).
 * - Responsive grid: 2 cols (base), 3 cols (md), 4 cols (xl).
 * - Top-right filter dropdown: default, latest, low-to-high, high-to-low.
 * - Infinite scrolling via IntersectionObserver over in-memory data.
 * - Replace <FallbackCard /> with your own Card component if you want.
 *
 * If you have images, import them and wire to `img1` / `img2`.
 * Example:
 *   import img1 from "@/public/img1.jpg";
 *   import img2 from "@/public/img2.jpg";
 */

// Optional: comment these if you already have img1/img2 in scope
// import img1 from "@/public/img1.jpg";
// import img2 from "@/public/img2.jpg";

const productsSeed = [
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
] as const;

// Optionally duplicate to better demonstrate infinite scroll (remove later)
const DUMMY_DATA = Array.from({ length: 6 })
  .flatMap(() => productsSeed)
  .map((p, i) => ({
    ...p,
    // derive a stable id and pseudo-createdAt for "latest" sort
    _id: `dummy-${i + 1}`,
    _createdAt: Date.now() - i * 1000 * 60 * 60, // newer first
  }));

type SortKey = "default" | "latest" | "low-to-high" | "high-to-low";
const PAGE_SIZE = 12;

export default function AllProductsPage() {
  const [sortBy, setSortBy] = React.useState<SortKey>("default");
  const [visible, setVisible] = React.useState<typeof DUMMY_DATA>([]);
  const [cursor, setCursor] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  // Initial load
  React.useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = React.useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    // Simulate fetch/pagination using the local array
    const next = cursor + PAGE_SIZE;
    const chunk = DUMMY_DATA.slice(cursor, next);

    setVisible((prev) => [...prev, ...chunk]);
    setCursor(next);
    setHasMore(next < DUMMY_DATA.length);

    // Slight delay to emulate network
    setTimeout(() => setIsLoading(false), 200);
  }, [cursor, hasMore, isLoading]);

  // Infinite scroll observer
  React.useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "600px 0px 600px 0px", threshold: 0.01 },
    );

    obs.observe(target);
    return () => obs.disconnect();
  }, [loadMore]);

  // Client-side sorting across visible items
  const sorted = React.useMemo(() => {
    if (sortBy === "default") return visible;

    const copy = [...visible];
    switch (sortBy) {
      case "latest":
        copy.sort((a, b) => (b._createdAt ?? 0) - (a._createdAt ?? 0));
        break;
      case "low-to-high":
        copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "high-to-low":
        copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
    }
    return copy;
  }, [visible, sortBy]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Collections</h1>

        {/* Filter Dropdown (top-right) */}
        <PremiumDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {/* Grid: 2 / 3 / 4 columns */}
      <section
        aria-label="Products"
        className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4"
      >
        {sorted.map((p) => (
          <ProductCard
            key={p._id}
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

        {/* Loading skeletons */}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-64 w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
      </section>

      {/* Sentinel for infinite scrolling */}
      <div ref={sentinelRef} className="h-10" />

      {/* End / Empty states */}
      {!hasMore && sorted.length > 0 && (
        <p className="mt-6 text-center text-sm text-neutral-500">
          You’ve reached the end.
        </p>
      )}
      {!isLoading && sorted.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm text-neutral-500">
            Try adjusting filters or check back later.
          </p>
        </div>
      )}
    </main>
  );
}

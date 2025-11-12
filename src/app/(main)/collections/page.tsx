"use client";

import * as React from "react";
import { PremiumDropdown } from "@/components/PremiumDropdown";
import { AllProducts } from "@/types/product";
import { ALL_PRODUCTS } from "@/data/dummy";
import RelatedProducts from "@/components/ui/RelatedProducts";

type SortKey = "default" | "latest" | "low-to-high" | "high-to-low";
const PAGE_SIZE = 12;

export default function AllProductsPage() {
  const [sortBy, setSortBy] = React.useState<SortKey>("default");
  const [visible, setVisible] = React.useState<AllProducts[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  // refs for synchronous checks inside observer / callbacks
  const loadingRef = React.useRef(false);
  const hasMoreRef = React.useRef(hasMore);
  const isLoadingRef = React.useRef(isLoading);

  // keep refs in sync with state
  React.useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  React.useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const loadMore = React.useCallback(() => {
    if (loadingRef.current || isLoadingRef.current || !hasMoreRef.current)
      return;
    loadingRef.current = true;
    setIsLoading(true);

    setVisible((prev) => {
      const start = prev.length;
      const next = start + PAGE_SIZE;
      const chunk = ALL_PRODUCTS.slice(start, next);
      setHasMore(next < ALL_PRODUCTS.length);
      return [...prev, ...chunk];
    });

    setTimeout(() => {
      setIsLoading(false);
      loadingRef.current = false;
    }, 200);
  }, []);

  // Initial load
  React.useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Infinite scroll observer
  React.useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!hasMoreRef.current) {
            obs.disconnect();
            return;
          }
          loadMore();
        }
      },
      { rootMargin: "300px 0px 300px 0px", threshold: 0.01 },
    );

    obs.observe(target);
    return () => obs.disconnect();
  }, [loadMore]);

  // Sorting across visible items
  const sorted = React.useMemo(() => {
    if (sortBy === "default") return visible;
    const copy = [...visible];
    switch (sortBy) {
      case "latest":
        copy.sort(
          (a, b) =>
            (new Date(b.createdAt).getTime() || 0) -
            (new Date(a.createdAt).getTime() || 0),
        );
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

  const skeletonCount = Math.min(PAGE_SIZE, 6);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Collections</h1>
        <PremiumDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <RelatedProducts products={sorted}>
        {/* Loading skeletons */}
        {isLoading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-64 w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
      </RelatedProducts>

      <div ref={sentinelRef} className="h-10" />

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

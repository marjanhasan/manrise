"use client";
import React, { useEffect, useRef } from "react";
import { AllProducts } from "@/types/product";
import { ALL_PRODUCTS } from "@/data/dummy";
import ProductGallery from "../product/ProductGallery";
import ProductHeader from "../product/ProductHeader";
import ProductOptions from "../product/ProductOptions";
import QuantityActions from "../product/QuantityActions";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  slug?: string;
};

/**
 * Module-level scroll lock counter (strictly typed, no `any`)
 */
let scrollLockCount = 0;
let originalOverflow = "";

export default function ProductQuickViewModal({ open, onClose, slug }: Props) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Safe product lookup (guards against undefined slug or invalid product entries)
  const product = React.useMemo<AllProducts | undefined>(() => {
    if (!slug) return undefined;
    const safeSlug = slug.toLowerCase();
    return ALL_PRODUCTS.find((p) => {
      const sku = p?.sku;
      if (!sku) return false;
      return sku.toLowerCase() === safeSlug;
    });
  }, [slug]);

  // ---------- State (hooks must be unconditional) ----------
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [size, setSize] = React.useState<string>("");
  const [qty, setQty] = React.useState<number>(1);

  // size-level info (if available)
  const selectedSize = product?.sizeVariants?.find((s) => s.size === size);
  const sizeStock: number | undefined = selectedSize?.stock;
  const sizeInStock: boolean | undefined = selectedSize?.inStock;
  const sizeSku = selectedSize?.sku ?? product?.sku;

  // initialize size when product changes
  useEffect(() => {
    if (!product) return;
    const defaultSize = product.sizes?.[0] ?? "";
    setSize((prev) => prev || defaultSize);
    setActiveIndex(0);
  }, [product]);

  // stock + availability logic
  const knownStock: number | undefined = sizeStock ?? product?.stock;
  const inStock: boolean =
    (sizeInStock ?? !!product?.inStock) &&
    (knownStock === undefined || knownStock > 0);

  const unitPrice = product?.price ?? 0;
  const compareAt = product?.compareAtPrice;

  // quantity helpers
  const maxQty = knownStock === undefined ? 99 : Math.max(1, knownStock);
  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => Math.min(maxQty, n + 1));

  useEffect(() => {
    setQty((n) => Math.min(Math.max(1, n), maxQty));
  }, [maxQty]);

  const formatBDT = React.useMemo(
    () =>
      new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const galleryImages = product?.images ?? [];
  const activeImageSrc =
    galleryImages?.[activeIndex]?.src ?? galleryImages?.[0]?.src ?? "";

  const helperText = !inStock
    ? "Out of stock"
    : knownStock !== undefined
      ? knownStock > 0
        ? `${knownStock} available`
        : "Out of stock"
      : "In stock";

  // keyboard (Escape) + Tab-trap while modal open
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;

        const focusableList = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (el) =>
            // consider only visible focusable elements
            el.offsetWidth > 0 ||
            el.offsetHeight > 0 ||
            el === document.activeElement,
        );

        if (focusableList.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusableList[0];
        const last = focusableList[focusableList.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // focus management when opening/closing
  useEffect(() => {
    if (!open) {
      if (lastFocusedRef.current) {
        try {
          lastFocusedRef.current.focus();
        } catch {
          /* ignore focus restore errors */
        }
      }
      return;
    }

    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
    // focus the panel after mount
    setTimeout(() => {
      try {
        panelRef.current?.focus();
      } catch {
        /* ignore */
      }
    }, 0);
  }, [open]);

  // Robust scroll-lock using module-level counter (no `any`)
  useEffect(() => {
    if (!open) return;

    scrollLockCount++;
    if (scrollLockCount === 1) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    return () => {
      scrollLockCount = Math.max(0, scrollLockCount - 1);
      if (scrollLockCount === 0) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [open]);

  // if not open, render nothing
  if (!open) return null;

  // product guard
  if (!product) {
    return (
      <div
        ref={backdropRef}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      >
        <div className="relative w-full max-w-2xl rounded bg-white p-6 shadow-lg">
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full bg-white p-1 shadow hover:bg-gray-100"
          >
            ✕
          </button>
          <div className="p-8 text-center text-gray-500">
            Product not found.
          </div>
        </div>
      </div>
    );
  }

  // ---------- RESPONSIVE LAYOUT / STYLE NOTES ----------
  // - Use a single-column stacked layout on small screens to avoid horizontal overflow.
  // - Constrain modal width on very small devices (max-w-[420px]) so it fits 320px screens.
  // - Make the internal panel scrollable (maxHeight + overflow auto) so content fits inside viewport.
  // - Thumbnails: if ProductGallery renders vertical thumbnails, it should switch to horizontal on small screens.
  //   If ProductGallery doesn't support that yet, wrap it with a small container or update ProductGallery.
  // ----------------------------------------------------

  return (
    <div
      ref={backdropRef}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      aria-hidden={false}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Product quick view"
        tabIndex={-1}
        /* Small screens: constrained modal width; stacked layout */
        className="relative w-full max-w-[420px] rounded bg-white shadow-lg outline-none sm:max-w-2xl md:max-w-6xl"
        onMouseDown={(e) => e.stopPropagation()}
        style={{ maxHeight: "calc(100vh - 2rem)", overflow: "auto" }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Grid: stacked on small devices, two-column on md+ */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-12 md:p-6">
          {/* left: gallery (stacked on mobile) */}
          <div className="col-span-1 md:col-span-6">
            {/* enforce a responsive height so images don't blow up on very short screens */}
            <div className="h-[52vh] w-full overflow-hidden rounded md:h-[68vh] lg:h-[72vh]">
              {/* ProductGallery should handle responsive thumbnails; if it currently renders vertical thumbs,
                  consider altering ProductGallery to use horizontal thumbnails on small screens.
                  As a fallback, we pass activeImage and activeIndex and allow it to be responsive. */}
              <ProductGallery
                images={galleryImages}
                title={product.title}
                code={product.code}
                activeImage={activeImageSrc}
                activeIndex={activeIndex}
                onThumbClick={(i) => setActiveIndex(i)}
                // OPTIONAL: if your ProductGallery supports props to switch thumbnails direction,
                // pass something like `thumbDirection={isMobile ? 'horizontal' : 'vertical'}`.
              />
            </div>
          </div>

          {/* right: product info (stacked below gallery on mobile) */}
          <div className="col-span-1 space-y-4 md:col-span-6">
            <ProductHeader
              title={product.title}
              bestSeller={product.bestSeller}
              rating={product.rating ?? 0}
              reviewCount={product.reviewCount}
              price={formatBDT.format(unitPrice)}
              compareAt={
                typeof compareAt === "number"
                  ? formatBDT.format(compareAt)
                  : undefined
              }
            />

            <hr className="border-neutral-200 dark:border-neutral-800" />

            <ProductOptions
              label="COLOR"
              values={[product.color]}
              selected={product.color}
              onSelect={() => {}}
            />

            {product.sizes?.length ? (
              <ProductOptions
                label="SIZE"
                values={product.sizes}
                selected={size}
                onSelect={(s) => {
                  setSize(s);
                  setActiveIndex(0);
                }}
                helper={helperText}
                requireSelection
              />
            ) : null}

            <QuantityActions
              qty={qty}
              onDec={dec}
              onInc={inc}
              inStock={inStock}
              onAdd={() =>
                console.log("Add to cart", {
                  qty,
                  size,
                  color: product.color,
                  sku: sizeSku,
                })
              }
              onBuy={() =>
                console.log("Buy now", {
                  qty,
                  size,
                  color: product.color,
                  sku: sizeSku,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

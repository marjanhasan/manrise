"use client";

import * as React from "react";
import { ALL_PRODUCTS } from "@/data/dummy";
import { AllProducts } from "@/types/product";
import TabSection from "@/components/ui/TabSection";
import RelatedProducts from "@/components/ui/RelatedProducts";
import SectionTitle from "@/components/product/SectionTitle";
import ProductHeader from "@/components/product/ProductHeader";
import ProductGallery from "@/components/product/ProductGallery";
import ProductOptions from "@/components/product/ProductOptions";
import QuantityActions from "@/components/product/QuantityActions";
import ShareBar from "@/components/product/ShareBar";
import GuaranteeBadges from "@/components/product/GuaranteeBadges";

export type PageProps = { params: Promise<{ slug: string }> };

// ----------------------- Page -----------------------
export default function ProductDetailsPage({ params }: PageProps) {
  const { slug } = React.use(params);

  const formatBDT = React.useMemo(
    () =>
      new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }),
    [],
  );

  // Find product by slug (case-insensitive)
  const product = React.useMemo<AllProducts | undefined>(
    () => ALL_PRODUCTS.find((p) => p.sku.toLowerCase() === slug?.toLowerCase()),
    [slug],
  );

  // ---------------- Hooks must be unconditional ----------------
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [size, setSize] = React.useState<string>("");
  const [qty, setQty] = React.useState(1);

  // ✅ Get specific stock/availability for selected size WITHOUT forcing defaults here
  const selectedSize = product?.sizeVariants?.find((s) => s.size === size);
  const sizeStock: number | undefined = selectedSize?.stock;
  const sizeInStock: boolean | undefined = selectedSize?.inStock;
  const sizeSku = selectedSize?.sku ?? product?.sku;

  // Initialize size when product changes
  React.useEffect(() => {
    if (!product) return;
    const s0 = product.sizes?.[0] ?? "";
    setSize((prev) => prev || s0);
    setActiveIndex(0);
  }, [product]);

  // ✅ Prefer size-level stock when defined; else product-level; else unknown (undefined)
  const knownStock: number | undefined = sizeStock ?? product?.stock;

  // ✅ Availability respects explicit size-level false; else product-level boolean
  const inStock: boolean =
    (sizeInStock ?? !!product?.inStock) &&
    (knownStock === undefined || knownStock > 0);

  const unitPrice = product?.price ?? 0;
  const compareAt = product?.compareAtPrice;

  // ✅ Quantity clamp:
  // - If stock unknown: allow up to 99
  // - If stock known: clamp to at most known stock (min 1 to keep control stable)
  const maxQty = knownStock === undefined ? 99 : Math.max(1, knownStock);
  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => Math.min(maxQty, n + 1));

  // Ensure qty never exceeds limits
  React.useEffect(() => {
    setQty((n) => Math.min(Math.max(1, n), maxQty));
  }, [maxQty]);

  // Gallery from color’s images
  const galleryImages = product?.images ?? [];
  const activeImageSrc =
    galleryImages?.[activeIndex]?.src ?? galleryImages?.[0]?.src ?? "";

  // Guard: product not found
  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="p-8 text-center text-gray-500">Product not found.</div>
      </main>
    );
  }

  // ✅ Helper text logic:
  // - If not in stock: "Out of stock"
  // - If stock known and > 0: "X available"
  // - If stock unknown but available: "In stock"
  const helperText = !inStock
    ? "Out of stock"
    : knownStock !== undefined
      ? knownStock > 0
        ? `${knownStock} available`
        : "Out of stock"
      : "In stock";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* LEFT: gallery */}
        <ProductGallery
          images={galleryImages}
          title={product.title}
          code={product.code}
          activeImage={activeImageSrc}
          activeIndex={activeIndex}
          onThumbClick={setActiveIndex}
        />

        {/* RIGHT: details */}
        <div className="space-y-6">
          <ProductHeader
            title={product.title}
            rating={product.reviewCount ? product.rating : 0}
            reviewCount={product.reviewCount}
            price={formatBDT.format(unitPrice)}
            compareAt={
              typeof compareAt === "number"
                ? formatBDT.format(compareAt)
                : undefined
            }
          />

          <hr className="border-neutral-200 dark:border-neutral-800" />

          {/* Fixed color (since this page is per-color) */}
          <ProductOptions
            label="COLOR"
            values={[product.color]}
            selected={product.color}
            onSelect={() => {}}
            // readOnly
          />

          {/* Size selector */}
          {product.sizes?.length > 0 && (
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
          )}

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

          <ShareBar phone="+8809606999695" />

          <GuaranteeBadges
            items={["100% Authentic", "7-Day Easy Return", "Cash on Delivery"]}
          />
        </div>
      </div>

      {/* ------------------ DESCRIPTION / DELIVERY OPTIONS ------------------ */}
      <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <TabSection
          title={product.title}
          description={product.description}
          sizeChart={product.sizeChart}
          fabricAndFit={product.fabricAndFit}
          specifications={product.specifications}
          careTips={product.careTips}
        />
      </section>

      {/* ------------------ RELATED PRODUCTS ------------------ */}
      <section className="mt-14">
        <SectionTitle title="RELATED PRODUCTS" />
        <RelatedProducts
          products={ALL_PRODUCTS.filter(
            (p) => p.code === product.code && p.sku !== product.sku,
          )}
        />
      </section>

      {/* ------------------ YOU MAY ALSO LIKE ------------------ */}
      <section className="mt-14">
        <SectionTitle title="YOU MAY ALSO LIKE" />
        <RelatedProducts
          products={ALL_PRODUCTS.filter((p) => p.code !== product.code)}
        />
      </section>
    </main>
  );
}

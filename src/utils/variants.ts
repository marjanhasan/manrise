// src/utils/variants.ts
import type { Product, ProductVariant, UiImage } from "@/types/product";

export function makeSku(productCode: string, color: string, size: string) {
  const c = color.replace(/\s+/g, "").slice(0, 3).toUpperCase(); // Black -> BLA
  const s = size.toUpperCase();
  return `${productCode}-${c}-${s}`; // e.g. MP-242-BLA-40
}

type StockInput =
  | number
  | ((ctx: {
      productCode: string;
      color: string;
      size: string;
      sku: string;
      index: number; // running index across all variants
    }) => number);

type ImagesInput =
  | UiImage[]
  | ((ctx: {
      productCode: string;
      color: string;
      size: string;
      sku: string;
      index: number;
    }) => UiImage[]);

type VariantDefaults = {
  stock?: StockInput; // NEW: can be number OR function
  price?: number;
  compareAtPrice?: number;
  image?: UiImage; // legacy single image (unused if images provided)
  images?: ImagesInput; // preferred: array or resolver
  createdAt?: string | (() => string);
};

export function buildVariants(
  productCode: string,
  colors: string[],
  sizes: string[],
  defaults: VariantDefaults = {},
): ProductVariant[] {
  const rows: ProductVariant[] = [];
  let index = 0;

  const getCreatedAt = () =>
    typeof defaults.createdAt === "function"
      ? defaults.createdAt()
      : defaults.createdAt;

  for (const color of colors) {
    for (const size of sizes) {
      const sku = makeSku(productCode, color, size);

      const stock =
        typeof defaults.stock === "function"
          ? Math.max(
              0,
              Math.floor(
                defaults.stock({ productCode, color, size, sku, index }),
              ),
            )
          : Math.max(0, Math.floor(defaults.stock ?? 0));

      const images =
        typeof defaults.images === "function"
          ? defaults.images({ productCode, color, size, sku, index })
          : (defaults.images ?? (defaults.image ? [defaults.image] : []));

      rows.push({
        id: sku,
        sku,
        title: `${color} / ${size}`,
        optionValues: { Color: color, Size: size },
        price: defaults.price,
        compareAtPrice: defaults.compareAtPrice,
        stock,
        inStock: stock > 0,
        images,
        createdAt: getCreatedAt(),
        bestSeller: false,
      });

      index++;
    }
  }
  return rows;
}

export function deriveInventory(product: Pick<Product, "variants">) {
  const total = product.variants.reduce((n, v) => n + v.stock, 0);
  return { totalStock: total, inStock: total > 0 } as const;
}

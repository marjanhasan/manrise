import { AllProducts, Product, ProductVariant, UiImage } from "@/types/product";

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

/* -------------------------------- Types --------------------------------- */

export type ColorGroup = {
  color: string;
  variants: ProductVariant[];
  images: UiImage[];
  price: number;
  compareAtPrice?: number;
};

export function groupByColor(product: Product): ColorGroup[] {
  const byColor = new Map<string, ProductVariant[]>();
  for (const v of product.variants) {
    const color = v.optionValues?.Color ?? "Unknown";
    if (!byColor.has(color)) byColor.set(color, []);
    byColor.get(color)!.push(v);
  }

  const groups: ColorGroup[] = [];
  for (const [color, variants] of byColor) {
    const sample = variants[0];
    const images = sample.images?.length
      ? sample.images
      : [{ src: "", alt: `${color} image` }];

    const prices = variants
      .map((v) => v.price)
      .map((n) => (typeof n === "number" ? n : undefined))
      .filter((n): n is number => typeof n === "number");
    const productPrice = (product as Product).price;
    const price = prices.length ? Math.min(...prices) : productPrice;

    const compareCandidates = variants
      .map((v) => v.compareAtPrice ?? (product as Product).compareAtPrice)
      .filter((n): n is number => typeof n === "number");
    const compareAtPrice = compareCandidates.length
      ? Math.min(...compareCandidates)
      : undefined;

    groups.push({ color, variants, images, price, compareAtPrice });
  }

  groups.sort((a, b) => a.color.localeCompare(b.color));
  return groups;
}

/* ----------------------------- Demo images ------------------------------ */

const IMG = (src: string, alt = "product img"): UiImage => ({ src, alt });

const COLORS = ["Black", "Navy", "Olive", "White"] as const;
const SIZES = ["38", "40", "42", "44"] as const;

const BASES = {
  A: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
  B: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
  C: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  D: "https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop",
};

const imgPair = (front: string, back: string, label: string): UiImage[] => [
  IMG(`${front}`, `${label} — front`),
  IMG(`${back}`, `${label} — back`),
];

const imagesForMP242 = ({ color }: { color: string }) => {
  const map: Record<string, UiImage[]> = {
    Black: imgPair(BASES.A, BASES.B, "Black"),
    Navy: imgPair(BASES.B, BASES.C, "Navy"),
    Olive: imgPair(BASES.C, BASES.D, "Olive"),
    White: imgPair(BASES.D, BASES.A, "White"),
  };
  return map[color] ?? imgPair(BASES.A, BASES.B, color);
};
const imagesForMP260 = ({ color }: { color: string }) => {
  const map: Record<string, UiImage[]> = {
    Black: imgPair(BASES.B, BASES.C, "Black"),
    Maroon: imgPair(BASES.C, BASES.D, "Maroon"),
    Cream: imgPair(BASES.D, BASES.A, "Cream"),
  };
  return map[color] ?? imgPair(BASES.B, BASES.C, color);
};
const imagesForMP310 = ({ color }: { color: string }) => {
  const map: Record<string, UiImage[]> = {
    Navy: imgPair(BASES.A, BASES.B, "Navy"),
    "Bottle Green": imgPair(BASES.C, BASES.D, "Bottle Green"),
  };
  return map[color] ?? imgPair(BASES.A, BASES.B, color);
};

/* ----------------------- Per-variant stock resolvers -------------------- */
// Different stock for different sizes (and colors if you want)

const stockMP242 = ({ color, size }: { color: string; size: string }) => {
  const table: Record<string, Record<string, number>> = {
    Black: { "38": 8, "40": 0, "42": 5, "44": 2 },
    Navy: { "38": 3, "40": 6, "42": 1, "44": 0 },
    Olive: { "38": 4, "40": 4, "42": 4, "44": 4 },
    White: { "38": 9, "40": 7, "42": 0, "44": 2 },
  };
  return table[color]?.[size] ?? 0;
};

const stockMP260 = ({ color, size }: { color: string; size: string }) => {
  // Example: sizes trend smaller stock
  const baseByColor: Record<string, number> = { Black: 4, Maroon: 2, Cream: 5 };
  const sizeFactor: Record<string, number> = {
    "38": 2,
    "40": 1,
    "42": 1,
    "44": 0,
  };
  return Math.max(0, (baseByColor[color] ?? 0) * (sizeFactor[size] ?? 0));
};

const stockMP310 = ({ size }: { color: string; size: string }) => {
  // Simple: explicit per size, same for both colors
  const bySize: Record<string, number> = { "38": 7, "40": 3, "42": 0, "44": 5 };
  return bySize[size] ?? 0;
};

/* ------------------------------- Variants ------------------------------- */
// Mark best-seller colors per product
const BEST_SELLER_COLORS_MP242 = new Set(["Black", "White"]);
const BEST_SELLER_COLORS_MP260 = new Set(["Cream"]);
const BEST_SELLER_COLORS_MP310 = new Set(["Navy"]);

const variantsMP242 = buildVariants("MP-242", [...COLORS], [...SIZES], {
  stock: ({ color, size }) => stockMP242({ color, size }),
  price: 2990,
  compareAtPrice: 3750,
  images: ({ color }) => imagesForMP242({ color }),
  createdAt: "2025-11-04T06:30:00.000Z",
}).map((v) => ({
  ...v,
  bestSeller: BEST_SELLER_COLORS_MP242.has(v.optionValues?.Color ?? ""),
}));

const variantsMP260 = buildVariants(
  "MP-260",
  ["Black", "Maroon", "Cream"],
  [...SIZES],
  {
    stock: ({ color, size }) => stockMP260({ color, size }),
    price: 3190,
    compareAtPrice: 3990,
    images: ({ color }) => imagesForMP260({ color }),
    createdAt: "2025-10-22T06:30:00.000Z",
  },
).map((v) => ({
  ...v,
  bestSeller: BEST_SELLER_COLORS_MP260.has(v.optionValues?.Color ?? ""),
}));

const variantsMP310 = buildVariants(
  "MP-310",
  ["Navy", "Bottle Green"],
  [...SIZES],
  {
    stock: ({ color, size }) => stockMP310({ color, size }),
    price: 2790,
    compareAtPrice: 3490,
    images: ({ color }) => imagesForMP310({ color }),
    createdAt: "2025-09-18T06:30:00.000Z",
  },
).map((v) => ({
  ...v,
  bestSeller: BEST_SELLER_COLORS_MP310.has(v.optionValues?.Color ?? ""),
}));

/* -------------------------------- Products ------------------------------ */

export const PRODUCTS: Product[] = [
  {
    id: "f2bcb25d-8974-4e60-bd82-3af8a0db9b39",
    title: "Manrise ELITE Quality Panjabi",
    code: "MP-242",
    description: "Premium cotton Panjabi with classic cut and detailed cuffs.",
    sizeChart: [
      ["38 (S)", `37.5"`, `38"`, `16"`, `22.5"`],
      ["40 (M)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["42 (L)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["44 (XL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
    ],
    fabricAndFit: {
      fabric: "Premium Imported Mixed Cotton ELITE",
      type: "Slim Fit ELITE",
      weave: "Plain weave ELITE",
      texture: "Soft and smooth with a matte finish ELITE",
      breathability: "Highly breathable and comfortable ELITE",
    },
    specifications: [
      "ManRise-branded button and rivet details ELITE",
      "Classic multi-pocket baggy design with modern comfort ELITE",
      "Straight fit silhouette that's easy to style for any occasion ELITE",
      "Quality stitching for long-lasting wear ELITE",
    ],
    careTips: [
      "ELITE Wash in cold water to keep the fabric's elegance.",
      "ELITE Avoid bleach to maintain the fabric’s brightness.",
      "ELITE Iron on medium heat to keep it looking fresh.",
      "ELITE Do not iron over any embroidered areas.",
      "ELITE Do not iron over label or the buttons.",
    ],
    price: 2990,
    compareAtPrice: 3750,
    rating: 4.8,
    reviewCount: 17,
    category: "Punjabi",
    tags: ["men", "punjabi", "cotton"],
    options: [
      { name: "Color", values: [...COLORS] },
      { name: "Size", values: [...SIZES] },
    ],
    variants: variantsMP242,
    createdAt: "2025-11-04T06:30:00.000Z",
    ...deriveInventory({ variants: variantsMP242 }),
  },
  {
    id: "7a8c91db-65c7-4964-9f71-4b9376bbdc19",
    title: "Heritage Embroidered Panjabi",
    code: "MP-260",
    description: "Classic embroidery with breathable cotton blend.",
    sizeChart: [
      ["40 (M)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["42 (L)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["44 (XL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["46 (XXL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
    ],
    fabricAndFit: {
      fabric: "Premium Imported Mixed Cotton Heritage",
      type: "Slim Fit Heritage",
      weave: "Plain weave Heritage",
      texture: "Soft and smooth with a matte finish Heritage",
      breathability: "Highly breathable and comfortable Heritage",
    },
    specifications: [
      "Heritage ManRise-branded button and rivet details",
      "Heritage Classic multi-pocket baggy design with modern comfort",
      "Heritage Straight fit silhouette that's easy to style for any occasion",
      "Heritage Quality stitching for long-lasting wear",
    ],
    careTips: [
      "Heritage Wash in cold water to keep the fabric's elegance.",
      "Heritage Avoid bleach to maintain the fabric’s brightness.",
      "Heritage Iron on medium heat to keep it looking fresh.",
      "Heritage Do not iron over any embroidered areas.",
      "Heritage Do not iron over label or the buttons.",
    ],
    price: 3190,
    compareAtPrice: 3990,
    rating: 4.6,
    reviewCount: 11,
    category: "Punjabi",
    tags: ["men", "punjabi", "embroidered"],
    options: [
      { name: "Color", values: ["Black", "Maroon", "Cream"] },
      { name: "Size", values: [...SIZES] },
    ],
    variants: variantsMP260,
    createdAt: "2025-10-22T06:30:00.000Z",
    ...deriveInventory({ variants: variantsMP260 }),
  },
  {
    id: "e1d42c2a-4f73-4b95-95ef-8adac4c30a81",
    title: "Everyday Classic Panjabi",
    code: "MP-310",
    description: "Soft hand-feel fabric suitable for daily wear.",
    sizeChart: [
      ["40 (M)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["42 (L)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["44 (XL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
      ["46 (XXL)", `39.5"`, `40"`, `16.5"`, `23.5"`],
    ],
    fabricAndFit: {
      fabric: "Premium Imported Mixed Cotton Classic",
      type: "Slim Fit Classic",
      weave: "Plain weave Classic",
      texture: "Soft and smooth with a matte finish Classic",
      breathability: "Highly breathable and comfortable Classic",
    },
    specifications: [
      "Classic ManRise-branded button and rivet details",
      "Classic Classic multi-pocket baggy design with modern comfort",
      "Classic Straight fit silhouette that's easy to style for any occasion",
      "Classic Quality stitching for long-lasting wear",
    ],
    careTips: [
      "Classic Wash in cold water to keep the fabric's elegance.",
      "Classic Avoid bleach to maintain the fabric’s brightness.",
      "Classic Iron on medium heat to keep it looking fresh.",
      "Classic Do not iron over any embroidered areas.",
      "Classic Do not iron over label or the buttons.",
    ],
    price: 2790,
    compareAtPrice: 3490,
    rating: 4.2,
    reviewCount: 9,
    category: "Punjabi",
    tags: ["men", "punjabi", "casual"],
    options: [
      { name: "Color", values: ["Navy", "Bottle Green"] },
      { name: "Size", values: [...SIZES] },
    ],
    variants: variantsMP310,
    createdAt: "2025-09-18T06:30:00.000Z",
    ...deriveInventory({ variants: variantsMP310 }),
  },
];

/* ---------------------- Convenience grouped exports --------------------- */

export const PRODUCTS_BY_COLOR = PRODUCTS.map((p) => ({
  productId: p.id,
  title: p.title,
  code: p.code,
  groups: groupByColor(p),
}));

export const ALL_PRODUCTS: AllProducts[] = PRODUCTS.flatMap((p) =>
  groupByColor(p).map((g) => {
    const sizeVariants = g.variants.map((v) => ({
      size: v.optionValues?.Size ?? "",
      sku: v.sku,
      stock: v.stock,
      inStock: v.inStock,
      price: v.price ?? p.price,
      compareAtPrice: v.compareAtPrice ?? p.compareAtPrice,
      images: v.images,
      createdAt: v.createdAt,
      bestSeller: !!v.bestSeller,
    }));

    const sizeStockBySize = Object.fromEntries(
      sizeVariants.map((sv) => [sv.size, sv.stock]),
    );

    return {
      productId: `${p.id}-${g.color}`,
      title: `${p.title} — ${g.color}`,
      code: p.code,
      description: p.description,
      sizeChart: p.sizeChart,
      fabricAndFit: p.fabricAndFit,
      specifications: p.specifications,
      careTips: p.careTips,
      color: g.color,

      // Pricing / meta at color level
      price: g.price,
      compareAtPrice: g.compareAtPrice,
      rating: p.rating,
      reviewCount: p.reviewCount,
      category: p.category,
      tags: p.tags,
      createdAt: p.createdAt,

      // Color-level fields
      sizes: g.variants.map((v) => v.optionValues?.Size ?? ""),
      images: g.images, // representative images for this color
      sku: g.variants[0]?.sku ?? "",
      stock: g.variants.reduce((sum, v) => sum + v.stock, 0),
      inStock: g.variants.some((v) => v.inStock),
      bestSeller: g.variants.some((v) => v.bestSeller), // color-level

      // NEW per-size detail
      sizeVariants,
      sizeStockBySize,
    };
  }),
);

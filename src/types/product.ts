import { StaticImageData } from "next/image";

export interface UiImage {
  src: string | StaticImageData;
  alt?: string;
}

export interface ProductOption {
  name: "Color" | "Size" | string;
  values: string[];
}

export interface ProductVariant {
  id: string; // variant id
  sku: string; // unique per color/size
  title: string; // e.g. "Black / 40"
  optionValues: Record<string, string>; // { Color: "Black", Size: "40" }
  price?: number; // override; falls back to product.price
  compareAtPrice?: number;
  stock: number; // inventory for THIS variant
  inStock: boolean; // derived from stock > 0 when seeding
  images: UiImage[]; // variant-specific images
  createdAt?: string;
  bestSeller: boolean;
}

export interface FabricAndFit {
  fabric: string;
  type: string;
  weave: string;
  texture: string;
  breathability: string;
}

export interface Product {
  id: string; // stable handle
  title: string;
  code: string; // product-level code (shared by variants)
  description: string;
  sizeChart: [string[], string[], string[], string[]];
  fabricAndFit: FabricAndFit;
  specifications: string[];
  careTips: string[];

  price: number; // base price (variants can override)
  compareAtPrice?: number;

  rating: number; // 0–5
  reviewCount: number;

  category?: string;
  tags?: string[];

  options: ProductOption[]; // e.g. Color, Size
  variants: ProductVariant[];

  // Derived helpers
  totalStock: number; // sum of variants' stock
  inStock: boolean; // any variant inStock

  createdAt: string;
}

export interface RelatedItem {
  productId: string; // fk -> Product.id
  title: string;
  code: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  images: {
    front: UiImage;
    back: UiImage;
  };
}

/* ---------- NEW: per-size detail type used by AllProducts ---------- */
export interface SizeVariant {
  size: string;
  sku: string;
  stock: number;
  inStock: boolean;
  price?: number;
  compareAtPrice?: number;
  images: UiImage[]; // this size’s own images (often same as color)
  createdAt?: string;
  bestSeller?: boolean; // per-size flag
}

/* ---------- Flattened, color-scoped product used by the PDP/grid ---------- */
export interface AllProducts {
  productId: string; // e.g. `${product.id}-${color}`
  title: string; // e.g. "Manrise ELITE — Black"
  code: string;
  description?: string;
  sizeChart: [string[], string[], string[], string[]];
  fabricAndFit: FabricAndFit;
  specifications: string[];
  careTips: string[];

  color: string;
  price: number; // color-level min price
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category?: string;
  tags?: string[];
  createdAt: string;

  // Color-level fields
  sizes: string[]; // available sizes for this color
  images: UiImage[]; // representative images for this color
  sku: string; // canonical color SKU (first size)
  stock: number; // total stock across sizes for this color
  inStock: boolean; // any size in stock?
  bestSeller: boolean;

  // NEW: per-size inventory/pricing/images
  sizeVariants: SizeVariant[];

  // Optional quick lookup: { "38": 3, "40": 0, ... }
  sizeStockBySize?: Record<string, number>;
}

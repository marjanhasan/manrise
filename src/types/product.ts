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
  image?: UiImage; // optional variant-specific image
}

export interface Product {
  id: string; // stable handle
  title: string;
  code: string; // product-level code (shared by variants)
  description?: string;

  price: number; // base price (variants can override)
  compareAtPrice?: number;

  rating: number; // 0–5
  reviewCount: number;

  images: UiImage[];
  category?: string;
  tags?: string[];

  options: ProductOption[]; // e.g. Color, Size
  variants: ProductVariant[];

  // Derived helpers
  totalStock?: number; // sum of variants' stock
  inStock?: boolean; // any variant inStock
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

/*
export interface Product1 {
  id: string;
  title: string;
  code: string;
  description?: string;
  price: number;
  oldPrice?: number;
  rating: number; // 0–5
  reviewCount: number;
  stock: number;
  inStock: boolean;
  colors: string[];
  sizes: string[];
  images: string[] | StaticImageData[];
  category?: string;
  tags?: string[];
}

export interface RelatedItem {
  productId: string; // fk -> Product.id
  href: string;
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

export interface CartLineItem {
  id: string;
  productId: string;
  title: string;
  image: string | StaticImageData;
  code: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  stock: number;
  inStock: boolean;
}

export interface RelatedItem1 {
  productId: string;
  title: string;
  code: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  imageFront: string | StaticImageData;
  imageBack: string | StaticImageData;
}
*/

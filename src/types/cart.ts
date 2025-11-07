import type { UiImage } from "@/types/product";

export interface CartLineItem {
  id: string; // cart line id
  productId: string; // fk -> Product.id
  variantId: string; // fk -> ProductVariant.id
  sku: string; // mirrors variant.sku
  title: string; // product title
  variantTitle: string; // e.g. "Black / 40"
  price: number; // unit price actually billed
  compareAtPrice?: number; // unit compare-at price
  quantity: number;
  image: UiImage; // primary image for the line
  stock: boolean; // stock check result
  maxQuantity?: number; // for UI limits
}

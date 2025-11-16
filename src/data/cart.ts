import type { CartLineItem } from "@/types/cart";
import { PRODUCTS } from "./dummy";

const firstVariant = PRODUCTS[0].variants[0];

export const CART_ITEMS: CartLineItem[] = [
  {
    id: "line-1",
    productId: PRODUCTS[0].id,
    variantId: firstVariant.id,
    sku: firstVariant.sku,
    title: PRODUCTS[0].title,
    variantTitle: firstVariant.title,
    price: firstVariant.price ?? PRODUCTS[0].price,
    compareAtPrice: firstVariant.compareAtPrice ?? PRODUCTS[0].compareAtPrice,
    quantity: 2,
    image: PRODUCTS[0].variants[0].images[0],
    stock: firstVariant.inStock,
    maxQuantity: 5,
  },
];

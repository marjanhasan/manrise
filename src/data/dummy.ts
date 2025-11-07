import { Product } from "@/types/product";
import { buildVariants, deriveInventory } from "@/utils/variants";

const IMG = (path: string) => ({ src: path, alt: "product img" });

const COLORS = ["Black", "Navy", "Olive", "White"] as const;
const SIZES = ["38", "40", "42", "44"] as const;

// --- Single product (exported separately) ---
const variantsMP242 = buildVariants("MP-242", [...COLORS], [...SIZES], {
  stock: 5,
  price: 2990,
  compareAtPrice: 3750,
});

// --- More products ---
const variantsMP260 = buildVariants(
  "MP-260",
  ["Black", "Maroon", "Cream"],
  [...SIZES],
  {
    stock: 3,
    price: 3190,
    compareAtPrice: 3990,
  },
);

const variantsMP310 = buildVariants(
  "MP-310",
  ["Navy", "Bottle Green"],
  [...SIZES],
  {
    stock: 7,
    price: 2790,
    compareAtPrice: 3490,
  },
);

export const PRODUCTS: Product[] = [
  {
    id: "f2bcb25d-8974-4e60-bd82-3af8a0db9b39",
    title: "Manrise ELITE Quality Panjabi",
    code: "MP-242",
    description: "Premium cotton Panjabi with classic cut and detailed cuffs.",
    price: 2990,
    compareAtPrice: 3750,
    rating: 4.8,
    reviewCount: 17,
    images: [
      IMG(
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop",
      ),
    ],
    category: "Punjabi",
    tags: ["men", "punjabi", "cotton"],
    options: [
      { name: "Color", values: [...COLORS] },
      { name: "Size", values: [...SIZES] },
    ],
    variants: variantsMP242,
    ...deriveInventory({ variants: variantsMP242 }),
  },
  {
    id: "7a8c91db-65c7-4964-9f71-4b9376bbdc19",
    title: "Heritage Embroidered Panjabi",
    code: "MP-260",
    description: "Classic embroidery with breathable cotton blend.",
    price: 3190,
    compareAtPrice: 3990,
    rating: 4.6,
    reviewCount: 11,
    images: [
      IMG(
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      ),
    ],
    category: "Punjabi",
    tags: ["men", "punjabi", "embroidered"],
    options: [
      { name: "Color", values: ["Black", "Maroon", "Cream"] },
      { name: "Size", values: [...SIZES] },
    ],
    variants: variantsMP260,
    ...deriveInventory({ variants: variantsMP260 }),
  },
  {
    id: "e1d42c2a-4f73-4b95-95ef-8adac4c30a81",
    title: "Everyday Classic Panjabi",
    code: "MP-310",
    description: "Soft hand-feel fabric suitable for daily wear.",
    price: 2790,
    compareAtPrice: 3490,
    rating: 4.2,
    reviewCount: 9,
    images: [
      IMG(
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop",
      ),
      IMG(
        "https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop",
      ),
    ],
    category: "Punjabi",
    tags: ["men", "punjabi", "casual"],
    options: [
      { name: "Color", values: ["Navy", "Bottle Green"] },
      { name: "Size", values: [...SIZES] },
    ],
    variants: variantsMP310,
    ...deriveInventory({ variants: variantsMP310 }),
  },
];

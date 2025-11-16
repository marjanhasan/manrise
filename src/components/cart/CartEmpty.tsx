// /components/cart/CartEmpty.tsx
"use client";
import Link from "next/link";

export default function CartEmpty() {
  return (
    <div className="grid h-full place-items-center p-6 text-center">
      <div>
        <h3 className="text-lg font-semibold">Your cart is empty</h3>
        <p className="text-muted-foreground mt-1 text-sm">
          Add products to complete your purchase.
        </p>
        <Link
          href="/collections"
          className="mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-medium hover:bg-black/5"
        >
          Browse collections
        </Link>
      </div>
    </div>
  );
}

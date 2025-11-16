// /components/cart/CartDrawerContent.tsx
"use client";
import { useMemo, useRef } from "react";
import CartLine, { Product } from "./CartLine";
import CartSummary from "./CartSummary";
import CartEmpty from "./CartEmpty";
import { CartLineItem } from "@/types/cart";

type CartDrawerContentProps = {
  items: CartLineItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
  onApplyCode?: (code: string) => Promise<void> | void;
  shipping?: number | "FREE" | null;
  tax?: number | null;
  discount?: number | null;
  content: string;
};
const demo: Product[] = [
  {
    id: "p1",
    title: "Premium Casual Printed Shirt For Men | MS-104",
    sku: "MS-104",
    imageSrc:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    price: 1290,
    originalPrice: 1600,
    size: "M",
    quantity: 1,
  },
  {
    id: "p2",
    title: "Premium Casual Printed Shirt For Men | MS-104",
    sku: "MS-105",
    imageSrc:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    price: 1290,
    originalPrice: 1600,
    size: "XXL",
    quantity: 1,
  },
  {
    id: "p3",
    title: "Premium Casual Printed Shirt For Men | MS-104",
    sku: "MS-106",
    imageSrc:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    price: 1290,
    originalPrice: 1600,
    size: "XL",
    quantity: 1,
  },
];
export default function CartDrawerContent({
  items,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  content,
}: CartDrawerContentProps) {
  const liveRef = useRef<HTMLDivElement>(null);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.quantity, 0),
    [items],
  );

  // const itemCount = useMemo(
  //   () => items.reduce((acc, it) => acc + it.quantity, 0),
  //   [items],
  // );
  const itemCount = 3;

  const announce = (msg: string) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  };

  const _onRemove = (id: string) => {
    onRemove(id);
    announce("Item removed from cart.");
  };

  const _onUpdateQuantity = (id: string, qty: number) => {
    onUpdateQuantity(id, qty);
    announce("Cart quantity updated.");
  };

  if (!items.length) return <CartEmpty />;
  console.log(items.length);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      <div className="text-muted-foreground mb-3 text-center text-sm">
        You have <span className="font-medium">{itemCount}</span>{" "}
        {itemCount === 1 ? "item" : "items"} in your {content}.
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto pr-0">
        {demo.map((p) => (
          <CartLine
            key={p.id}
            product={p}
            onRemove={(id) => console.log("remove", id)}
            onIncrease={(id) => console.log("inc", id)}
            onDecrease={(id) => console.log("dec", id)}
          />
        ))}
      </ul>

      <CartSummary subtotal={subtotal} onCheckout={onCheckout} />
    </div>
  );
}

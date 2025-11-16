"use client";
import { formatMoneyBDT } from "@/lib/money";

type CartSummaryProps = {
  subtotal: number;
  onCheckout: () => void;
  checkoutCta?: string;
};

export default function CartSummary({
  subtotal,
  onCheckout,
  checkoutCta = "Proceed to Checkout",
}: CartSummaryProps) {
  return (
    <div className="sticky bottom-0 mt-4 rounded-xl border bg-white p-4 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.08)]">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">{formatMoneyBDT(subtotal)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="mt-3 w-full cursor-pointer rounded-lg bg-gray-900 px-4 py-1 text-white hover:opacity-90 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
        aria-label="Checkout"
      >
        {checkoutCta}
      </button>

      <p className="text-muted-foreground mt-2 text-center text-xs">
        Secure checkout • 30-day returns
      </p>
    </div>
  );
}

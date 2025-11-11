"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";

type QAProps = {
  qty: number;
  inStock: boolean;
  onDec: () => void;
  onInc: () => void;
  onAdd: () => void;
  onBuy: () => void;
};

export default function QuantityActions({
  qty,
  inStock,
  onDec,
  onInc,
  onAdd,
  onBuy,
}: QAProps) {
  const disabled = !inStock || qty < 1;

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Quantity selector */}
        <div className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={onDec}
            className="grid h-10 w-10 cursor-pointer place-items-center disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease quantity"
            disabled={qty <= 1}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2.5rem] text-center text-sm font-medium select-none">
            {qty}
          </span>
          <button
            onClick={onInc}
            className="grid h-10 w-10 cursor-pointer place-items-center disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Increase quantity"
            disabled={!inStock}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAdd}
          disabled={disabled}
          className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 sm:flex-1 ${
            disabled
              ? "cursor-not-allowed bg-neutral-300 text-neutral-500 opacity-60 dark:bg-neutral-700 dark:text-neutral-400"
              : "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 hover:shadow-[0_0_10px_#00000022] dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          }`}
        >
          {inStock ? "Add To Cart" : "Out of Stock"}
        </button>

        {/* Buy Now */}
        <button
          onClick={onBuy}
          disabled={disabled}
          className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:flex-1 ${
            disabled
              ? "cursor-not-allowed bg-gray-300 text-gray-500 opacity-60 dark:bg-gray-700 dark:text-gray-400"
              : "bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] hover:scale-[1.02] hover:from-gray-600 hover:via-gray-400 hover:to-gray-600 hover:shadow-[0_0_20px_#00000044,0_0_35px_#00000033] active:scale-[0.99]"
          }`}
        >
          Buy Now
        </button>
      </div>
    </section>
  );
}

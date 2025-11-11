"use client";
import * as React from "react";
import { Check } from "lucide-react";

type GBProps = { items: string[] };
export default function GuaranteeBadges({ items }: GBProps) {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((t) => (
        <div
          key={t}
          className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm dark:border-neutral-700"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 text-white dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black">
            <Check className="h-3.5 w-3.5" />
          </span>
          {t}
        </div>
      ))}
    </section>
  );
}

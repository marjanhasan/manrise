import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

type SortKey = "default" | "latest" | "low-to-high" | "high-to-low";

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Default", value: "default" },
  { label: "Latest", value: "latest" },
  { label: "Price: Low → High", value: "low-to-high" },
  { label: "Price: High → Low", value: "high-to-low" },
];

export function PremiumDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: SortKey;
  setSortBy: (value: SortKey) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
      >
        <span>
          {sortOptions.find((o) => o.value === sortBy)?.label ?? "Sort"}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
          >
            {sortOptions.map((opt) => (
              <li key={opt.value}>
                <button
                  onClick={() => {
                    setSortBy(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                    sortBy === opt.value
                      ? "font-semibold text-black dark:text-white"
                      : "text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  {opt.label}
                  {sortBy === opt.value && (
                    <motion.span
                      layoutId="selectedDot"
                      className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
                    />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import * as React from "react";

type OptionsProps = {
  label: string;
  values: string[];
  selected: string;
  onSelect: (value: string) => void;
  helper?: string;
  requireSelection?: boolean;
};
export default function ProductOptions({
  label,
  values,
  selected,
  onSelect,
  helper,
  requireSelection,
}: OptionsProps) {
  return (
    <section className="space-y-2">
      <div className="text-sm">
        <span className="font-medium">{label}:</span>{" "}
        {requireSelection && !selected ? (
          <span className="text-red-600">Select a {label.toLowerCase()}</span>
        ) : (
          <span className="text-neutral-600 dark:text-neutral-300">
            {selected}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {values?.map((v) => {
          const active = selected === v;
          return (
            <button
              key={v}
              onClick={() => onSelect(v)}
              className={`cursor-pointer rounded-xl border px-3 py-1.5 text-sm font-medium text-gray-800 shadow-md transition-all duration-300 ${
                active
                  ? "border-transparent bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black"
                  : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
              }`}
              aria-pressed={active}
            >
              {v}
            </button>
          );
        })}
      </div>
      {typeof helper === "string" && (
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          {helper}
        </div>
      )}
    </section>
  );
}

"use client";
import * as React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-center text-xl font-semibold tracking-wide">
        {title}
      </h2>
      <div className="relative mt-2">
        <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="absolute top-0 left-1/2 h-0.5 w-24 -translate-x-1/2 rounded-full bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200" />
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import clsx from "clsx";

type DrawerSide = "left" | "right";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  side?: DrawerSide;
  widthClass?: string; // e.g., "w-64 lg:w-80 2xl:w-96"
  title?: string;
  children: React.ReactNode;
  closeButton?: React.ReactNode; // optional custom close button
};

export default function Drawer({
  isOpen,
  onClose,
  side = "right",
  widthClass = "w-64 lg:w-80 2xl:w-96",
  title,
  children,
  closeButton,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const fromClass = side === "left" ? "-translate-x-full" : "translate-x-full";
  const toClass = "translate-x-0";

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 transition-opacity",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        ref={panelRef}
        className={clsx(
          "bg-sidebar fixed top-0 z-50 h-full transform shadow-lg transition-transform duration-300 ease-in-out",
          widthClass,
          side === "left" ? "left-0" : "right-0",
          isOpen ? toClass : fromClass,
        )}
      >
        <div className="relative h-full p-4">
          {closeButton}
          {title && (
            <h2 id="drawer-title" className="mb-4 text-lg font-bold">
              {title}
            </h2>
          )}
          <div className="h-[calc(100%-2rem)] overflow-y-auto">{children}</div>
        </div>
      </aside>
    </>
  );
}

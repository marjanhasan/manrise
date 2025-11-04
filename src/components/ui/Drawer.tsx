"use client";
import { useEffect, useRef } from "react";
import clsx from "clsx";

type DrawerSide = "left" | "right";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  side?: DrawerSide;
  widthClass?: string;
  title?: string;
  children: React.ReactNode;
  closeButton?: React.ReactNode;
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
  const prevOverflowRef = useRef<string>("");
  const prevPaddingRightRef = useRef<string>("");
  const lockedRef = useRef(false);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open; unlock only after close animation ends
  useEffect(() => {
    const docEl = document.documentElement;

    const lockBody = () => {
      if (lockedRef.current) return;
      const hasVScroll = docEl.scrollHeight > docEl.clientHeight;
      const scrollbarWidth = hasVScroll
        ? window.innerWidth - docEl.clientWidth
        : 0;

      prevOverflowRef.current = document.body.style.overflow;
      prevPaddingRightRef.current = document.body.style.paddingRight;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      lockedRef.current = true;
    };

    const unlockBody = () => {
      if (!lockedRef.current) return;
      document.body.style.overflow = prevOverflowRef.current;
      document.body.style.paddingRight = prevPaddingRightRef.current;
      lockedRef.current = false;
    };

    // while opening -> lock immediately
    if (isOpen) {
      lockBody();
      return;
    }

    // while closing -> wait for the transform transition to finish
    const node = panelRef.current;
    if (!node) {
      // safety fallback
      unlockBody();
      return;
    }

    let timeoutId: number | undefined = undefined;

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "transform") {
        node.removeEventListener("transitionend", onTransitionEnd);
        if (timeoutId) window.clearTimeout(timeoutId);
        unlockBody();
      }
    };

    node.addEventListener("transitionend", onTransitionEnd);

    // Fallback in case transitionend doesn't fire (display changes, etc.)
    // Tailwind duration-300 + a little buffer
    timeoutId = window.setTimeout(() => {
      node.removeEventListener("transitionend", onTransitionEnd);
      unlockBody();
    }, 400);

    return () => {
      node.removeEventListener("transitionend", onTransitionEnd);
      if (timeoutId) window.clearTimeout(timeoutId);
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
          "bg-sidebar fixed top-0 z-50 h-full transform shadow-lg transition-transform duration-300 ease-in-out will-change-transform",
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

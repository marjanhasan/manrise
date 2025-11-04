"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_USERNAME = "manrisebd";

export default function MessengerButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openBrowserChat = useCallback(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isMobile =
      /iphone|ipad|ipod|android|blackberry|iemobile|opera mini/.test(ua);
    const url = isMobile
      ? `https://m.facebook.com/messages/t/${PAGE_USERNAME}?ref=site_fab`
      : `https://www.facebook.com/messages/t/${PAGE_USERNAME}?ref=site_fab`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const openMessengerLink = useCallback(() => {
    window.open(
      `https://m.me/${PAGE_USERNAME}`,
      "_blank",
      "noopener,noreferrer",
    );
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen((p) => !p), []);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {/* Backdrop: ensures outside clicks close even over iframes/banners */}
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            aria-hidden
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[9998] bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div
        ref={wrapperRef}
        className="fixed right-[max(1rem,calc((100vw-1600px)/2+1.5rem))] bottom-20 z-[9999] md:bottom-5"
      >
        {/* FAB (stays put) */}
        <button
          onClick={toggleMenu}
          aria-label="Chat on Messenger"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-700 text-white shadow-[0_0_12px_#00000033,0_0_24px_#00000022] transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_18px_#00000044,0_0_35px_#00000033] active:scale-95 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400"
        >
          <FaFacebookMessenger className="h-6 w-6" />
        </button>

        {/* Menu (absolute, opens to LEFT of FAB) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-[calc(100%+0.5rem)] bottom-0 w-max overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-neutral-800/90"
            >
              <button
                onClick={() => {
                  openBrowserChat();
                  setMenuOpen(false);
                }}
                className="block cursor-pointer px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                💬 Open in Browser
              </button>
              <button
                onClick={() => {
                  openMessengerLink();
                  setMenuOpen(false);
                }}
                className="block cursor-pointer px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                🚀 Open in Messenger
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

"use client";
import * as React from "react";
import {
  Phone,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Share2,
} from "lucide-react";

type ShareBarProps = { phone: string };

export default function ShareBar({ phone }: ShareBarProps) {
  // Ensure the initial client render equals the server render.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const shareUrl = mounted ? window.location.href : "";
  const shareText = mounted
    ? encodeURIComponent(document.title || "Product")
    : "Product";

  const facebookShare = mounted
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    : "#";
  const twitterShare = mounted
    ? `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`
    : "#";
  // Note: Instagram doesn't have a web share URL; this just opens the site/app.
  const instagramShare = mounted
    ? `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`
    : "#";

  return (
    <>
      <div className="flex flex-col gap-4 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Wishlist (pure UI placeholder) */}
        <button className="inline-flex cursor-pointer items-center gap-2 text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">
          <Heart className="h-4 w-4" />
          <span className="font-medium">ADD TO WISHLIST</span>
        </button>

        <div className="flex flex-wrap items-center gap-3 text-neutral-600 sm:justify-end dark:text-neutral-300">
          <span className="inline-flex items-center gap-1 font-medium">
            <Share2 className="h-4 w-4" /> Share To:
          </span>

          <a
            href={facebookShare}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white dark:hover:from-gray-300 dark:hover:via-gray-400 dark:hover:to-gray-200 dark:hover:text-black"
            aria-label="Share to Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>

          <a
            href={twitterShare}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white dark:hover:from-gray-300 dark:hover:via-gray-400 dark:hover:to-gray-200 dark:hover:text-black"
            aria-label="Share to Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>

          <a
            href={instagramShare}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg p-1.5 transition-all duration-200 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white dark:hover:from-gray-300 dark:hover:via-gray-400 dark:hover:to-gray-200 dark:hover:text-black"
            aria-label="Share to Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
      {/* Call now */}
      <button
        onClick={() =>
          (window.location.href = `tel:${phone.replace(/\s+/g, "")}`)
        }
        className="group relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900"
      >
        <Phone className="h-5 w-5 shrink-0" />
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{formatPhone(phone)}</span>
          <span className="rounded-lg bg-gradient-to-tr from-gray-700 via-gray-500 to-gray-700 px-2 py-0.5 text-xs font-semibold text-white shadow-[0_0_15px_#00000033,0_0_25px_#00000022] dark:from-gray-200 dark:via-gray-400 dark:to-gray-200 dark:text-black">
            CALL US NOW
          </span>
        </div>
      </button>
    </>
  );
}

function formatPhone(p: string) {
  // naive prettifier
  return p.replace(/\+?(\d{2})(\d{4})(\d{6})/, "+$1 $2 $3");
}

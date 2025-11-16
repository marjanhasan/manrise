import React from "react";
import { Heart, House, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

// Default items (kept outside component so they can be reused/overridden)
export const navigationMenuItems = [
  { title: "Home", href: "/", icon: House },
  { title: "Collection", href: "/collection", icon: Menu },
  { title: "Search", href: "/search", icon: Search },
  { title: "Cart", href: "/cart", icon: ShoppingCart },
  { title: "Wishlist", href: "/wishlist", icon: Heart },
];

/**
 * Super-responsive bottom navigation for mobile.
 * Props:
 * - items: optionally provide a custom menu array (same shape as navigationMenuItems)
 * - isModalOpen: if true and hideOnModal is true, the nav will hide to avoid overlapping modals
 * - hideOnModal: boolean to control auto-hide when a modal is open (default: true)
 */
export function ButtonGroupMobile({ items = navigationMenuItems }) {
  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed right-0 bottom-0 left-0 z-30 md:hidden"
    >
      <div
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0)" }}
        className="shadow-t flex w-full items-center justify-center border-t border-gray-100 bg-white/95 backdrop-blur-md"
      >
        <ul className="flex w-full max-w-3xl items-center justify-around px-1 py-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="flex-1">
                <Link
                  href={item.href}
                  className="group flex w-full flex-col items-center justify-center py-2.5 text-gray-700 transition-colors duration-150 hover:text-yellow-600 focus:text-yellow-600 focus:outline-none"
                  aria-label={item.title}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                  <span className="mt-1 text-xs leading-none sm:text-sm">
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default ButtonGroupMobile;

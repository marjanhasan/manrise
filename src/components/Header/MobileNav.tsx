"use client";
import Logo from "@/components/ui/Logo";
import IconButton from "@/components/ui/IconButton";
import { Menu, ShoppingCart, X } from "lucide-react";
import Drawer from "@/components/ui/Drawer";
import Link from "next/link";
import { useState } from "react";

type MobileNavProps = {
  onOpenCart: () => void;
};

export default function MobileNav({ onOpenCart }: MobileNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 lg:hidden">
        <IconButton aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
          <Menu />
        </IconButton>

        <Logo size={40} />

        <IconButton aria-label="Open cart" onClick={onOpenCart}>
          <ShoppingCart className="h-6 w-6" />
        </IconButton>
      </div>

      {/* Left drawer menu */}
      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        side="left"
        widthClass="w-64"
        title="Menu"
        closeButton={
          <button
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        }
      >
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block rounded-md px-4 py-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/collections" className="block rounded-md px-4 py-2">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="block rounded-md px-4 py-2">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block rounded-md px-4 py-2">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  );
}

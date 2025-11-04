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
          <IconButton
            className="absolute top-4 right-4"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <X />
          </IconButton>
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

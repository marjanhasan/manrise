"use client";
import { useState } from "react";
import Drawer from "@/components/ui/Drawer";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import IconButton from "@/components/ui/IconButton";
import { X } from "lucide-react";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <nav className="bg-accent sticky top-0 z-40 shadow-md">
      {/* Desktop */}
      <DesktopNav
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Mobile */}
      <MobileNav onOpenCart={() => setIsCartOpen(true)} />

      {/* Cart Drawer */}
      <Drawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        side="right"
        widthClass="w-64 lg:w-80 2xl:w-96"
        title="Shopping Cart"
        closeButton={
          <IconButton
            className="absolute top-4 right-4"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
          >
            <X />
          </IconButton>
        }
      >
        {/* Replace placeholders with real cart line items */}
        <ul className="space-y-2">
          <li>Your cart has 2 items.</li>
          <li className="flex justify-between border-b py-2">
            <span>Product Name 1</span>
            <span>$99</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Product Name 2</span>
            <span>$49</span>
          </li>
        </ul>
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        side="right"
        widthClass="w-64 lg:w-80 2xl:w-96"
        title="Wishlist"
        closeButton={
          <IconButton
            className="absolute top-4 right-4"
            aria-label="Close wishlist"
            onClick={() => setIsWishlistOpen(false)}
          >
            <X />
          </IconButton>
        }
      >
        {/* Replace placeholders with real wishlist items */}
        <ul className="space-y-2">
          <li>Your wishlist has 2 items.</li>
          <li className="flex justify-between border-b py-2">
            <span>Product Name 1</span>
            <span>$99</span>
          </li>
          <li className="flex justify-between border-b py-2">
            <span>Product Name 2</span>
            <span>$49</span>
          </li>
        </ul>
      </Drawer>
    </nav>
  );
}

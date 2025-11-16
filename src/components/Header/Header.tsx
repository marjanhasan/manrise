"use client";
import { useState } from "react";
import Drawer from "@/components/ui/Drawer";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { X } from "lucide-react";
import CartDrawerContent from "../cart/CartDrawerContent";
import { CART_ITEMS as items } from "@/data/cart";
import ProductQuickViewModal from "../ui/ProductQuickViewModal";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [open, setOpen] = useState(false);

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
          <button
            aria-label="Close Cart"
            onClick={() => setIsCartOpen(false)}
            className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        }
      >
        <CartDrawerContent
          items={items}
          onRemove={(id) => {
            /* remove from store */
          }}
          onUpdateQuantity={(id, qty) => {
            /* update in store */
          }}
          onCheckout={() => {
            /* route to /checkout */
            setOpen((prev) => !prev);
          }}
          onApplyCode={async (code) => {
            /* apply coupon */
          }}
          shipping={null} // "FREE" | number | null
          tax={null} // number | null
          discount={null} // number | null
          content="cart"
        />
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        side="right"
        widthClass="w-64 lg:w-80 2xl:w-96"
        title="Wishlist"
        closeButton={
          <button
            aria-label="Close wishlist"
            onClick={() => setIsWishlistOpen(false)}
            className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        }
      >
        <CartDrawerContent
          items={items}
          onRemove={(id) => {
            /* remove from store */
          }}
          onUpdateQuantity={(id, qty) => {
            /* update in store */
          }}
          onCheckout={() => {
            /* route to /checkout */
          }}
          onApplyCode={async (code) => {
            /* apply coupon */
          }}
          shipping={null} // "FREE" | number | null
          tax={null} // number | null
          discount={null} // number | null
          content="wishlist"
        />
      </Drawer>
      <ProductQuickViewModal open={open} onClose={() => setOpen(false)} />
    </nav>
  );
}

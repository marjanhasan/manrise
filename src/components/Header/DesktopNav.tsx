"use client";
import { Heart, ShoppingCart } from "lucide-react";
import NavLink from "@/components/ui/NavLink";
import Logo from "@/components/ui/Logo";
import UserMenu from "./UserMenu";
import IconButton from "@/components/ui/IconButton";

type DesktopNavProps = {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
};

export default function DesktopNav({
  onOpenCart,
  onOpenWishlist,
}: DesktopNavProps) {
  return (
    <div className="mx-auto hidden h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:flex lg:px-8 2xl:h-20">
      {/* Left */}
      <div className="flex gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/collections">Collections</NavLink>
      </div>

      {/* Center */}
      <Logo size={50} />

      {/* Right */}
      <div className="flex items-center space-x-2">
        <IconButton aria-label="Open cart" onClick={onOpenCart}>
          <ShoppingCart className="h-6 w-6" />
        </IconButton>
        <IconButton aria-label="Open wishlist" onClick={onOpenWishlist}>
          <Heart className="h-6 w-6" />
        </IconButton>
        <UserMenu />
      </div>
    </div>
  );
}

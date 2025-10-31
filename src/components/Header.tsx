"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, X, ShoppingCart, UserRound } from "lucide-react";
import logo from "../../public/ManRise.png";

export default function Header() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  return (
    <>
      <nav className="bg-accent sticky top-0 z-40 shadow-md">
        {/* Larger Screen Menu */}
        <div className="mx-auto hidden h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:flex lg:px-8 2xl:h-20">
          {/* Left Side */}
          <div className="flex gap-4">
            <Link
              href={"/"}
              className="relative font-medium transition-colors before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-gray-900 before:transition-all hover:text-gray-900 hover:before:w-full"
            >
              Home
            </Link>
            <Link
              href={"/collections"}
              className="relative font-medium transition-colors before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-gray-900 before:transition-all hover:text-gray-900 hover:before:w-full"
            >
              Collections
            </Link>
          </div>

          {/* Center: Brand Logo */}
          <Link href={"/"} className="flex-shrink-0 cursor-pointer">
            <Image
              src={logo}
              alt="Brand Logo"
              width={50}
              style={{ height: "auto" }}
              priority={false}
            />
          </Link>

          {/* Right Side: Icons & Search */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <ShoppingCart
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            />
            {/* Wishlist Icon */}
            <Heart
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsWishlistOpen(true)}
            />
            {/* User Icon with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              <button className="cursor-pointer">
                <UserRound className="h-6 w-6" />
              </button>
              {isUserDropdownOpen && (
                <div className="bg-sidebar absolute top-2 right-0 z-50 mt-2 w-48 rounded-md py-1 shadow-lg">
                  <Link href="/auth" className="block px-4 py-2 text-sm">
                    Login/Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Small Screen Menu */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          {/* Menu Button */}
          <button className="" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
          {/* Brand Logo */}
          <Link href={"/"} className="flex-shrink-0 cursor-pointer">
            <Image
              src={logo}
              alt="Brand Logo"
              width={40}
              style={{ height: "auto" }}
              priority={false}
            />
          </Link>
          {/* Cart Icon */}
          <button onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Sidebar */}
        <div
          className={`bg-sidebar fixed top-0 left-0 z-40 h-full w-64 transform shadow-lg transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block rounded-md px-4 py-2">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-md px-4 py-2">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-md px-4 py-2">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block rounded-md px-4 py-2">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Menu Overlay when sidebar is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
        {/* Menu Sidebar End */}

        {/* Cart Sidebar */}
        <div
          className={`bg-sidebar fixed top-0 right-0 z-40 h-full w-64 transform shadow-lg transition-transform duration-300 ease-in-out lg:w-80 2xl:w-96 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              <X />
            </button>
            <ul className="space-y-2">
              <li className="mb-4 text-lg font-bold">Shopping Cart</li>
              <li>Your cart has 2 items.</li>
              {/* Add cart items here */}
              <li className="flex justify-between border-b py-2">
                <span>Product Name 1</span>
                <span>$Price 99</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>Product Name 2</span>
                <span>$Price 49</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cart Overlay when sidebar is open */}
        {isCartOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          ></div>
        )}
        {/* Cart Sidebar End */}

        {/* Wishlist Sidebar */}
        <div
          className={`bg-sidebar fixed top-0 right-0 z-40 h-full w-64 transform shadow-lg transition-transform duration-300 ease-in-out lg:w-80 2xl:w-96 ${
            isWishlistOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="absolute top-4 right-4 cursor-pointer"
            >
              <X />
            </button>
            <ul className="space-y-2">
              <li className="mb-4 text-lg font-bold">Wishlist</li>
              <li>Your wishlist has 2 items.</li>
              {/* Add wishlist items here */}
              <li className="flex justify-between border-b py-2">
                <span>Product Name 1</span>
                <span>$Price 99</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>Product Name 2</span>
                <span>$Price 49</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Wishlist Overlay when sidebar is open */}
        {isWishlistOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsWishlistOpen(false)}
          ></div>
        )}
        {/* Wishlist Sidebar End */}
      </nav>
    </>
  );
}

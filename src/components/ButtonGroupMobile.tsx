import { Heart, House, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const navigationMenuItems = [
  { title: "Home", href: "#", icon: House },
  { title: "Collection", href: "/collection", icon: Menu },
  { title: "Search", href: "#", icon: Search },
  { title: "Cart", href: "#account", icon: ShoppingCart },
  { title: "Wishlist", href: "#settings", icon: Heart },
];

export function ButtonGroupMobile() {
  return (
    <nav className="shadow-t fixed bottom-0 z-50 w-full bg-white/90 backdrop-blur-md md:hidden">
      <ul className="flex w-full items-center justify-around">
        {navigationMenuItems.map((item) => (
          <li key={item.title} className="flex-1">
            <Link
              href={item.href}
              className="flex flex-col items-center justify-center py-2 text-gray-700 transition-colors duration-200 hover:text-yellow-600"
            >
              <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              <span className="mt-1 text-xs sm:text-sm">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

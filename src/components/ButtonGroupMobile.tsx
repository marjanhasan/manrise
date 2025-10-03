import { Heart, House, Menu, Search, ShoppingCart } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navigationMenuItems = [
  { title: "Home", href: "#", icon: House },
  { title: "Collection", href: "/collection", icon: Menu },
  { title: "Search", href: "#", icon: Search },
  { title: "Cart", href: "#account", icon: ShoppingCart },
  { title: "Wishlist", href: "#settings", icon: Heart },
];

export function ButtonGroupSize() {
  return (
    <nav className="sticky bottom-0 mx-auto w-fit md:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationMenuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex h-auto flex-col items-center px-2 py-2.5",
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

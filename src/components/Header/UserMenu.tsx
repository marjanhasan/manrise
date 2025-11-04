"use client";
import Link from "next/link";
import { useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { UserRound } from "lucide-react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <IconButton
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User menu"
      >
        <UserRound className="h-6 w-6" />
      </IconButton>

      <div
        className={`bg-sidebar absolute top-4 right-0 z-50 mt-2 w-48 rounded-md py-1 shadow-lg transition-opacity ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="menu"
      >
        <Link href="/auth" className="block px-4 py-2 text-sm" role="menuitem">
          Login / Register
        </Link>
      </div>
    </div>
  );
}

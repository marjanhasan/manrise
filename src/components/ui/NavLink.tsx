"use client";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type NavLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  active?: boolean;
};

export default function NavLink({ className, active, ...props }: NavLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        "relative font-medium transition-colors before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-gray-900 before:transition-all hover:text-gray-900 hover:before:w-full",
        active && "text-gray-900 before:w-full",
        className,
      )}
    />
  );
}

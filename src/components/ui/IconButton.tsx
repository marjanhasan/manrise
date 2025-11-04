"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

IconButton.displayName = "IconButton";
export default IconButton;

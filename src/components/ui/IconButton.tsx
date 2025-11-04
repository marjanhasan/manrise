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
        "inline-flex cursor-pointer items-center justify-center rounded-md bg-transparent p-2",
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

"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/ManRise.png";

type LogoProps = {
  size?: number;
};

export default function Logo({ size = 50 }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex-shrink-0 cursor-pointer"
      aria-label="Go to homepage"
    >
      <Image
        src={logo}
        alt="Brand logo"
        width={size}
        style={{ height: "auto" }}
        priority={false}
      />
    </Link>
  );
}

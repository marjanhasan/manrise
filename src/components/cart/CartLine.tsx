// components/CartItem.tsx
import Image from "next/image";
import React from "react";

export type Product = {
  id: string;
  title: string;
  sku?: string;
  imageSrc: string;
  price: number;
  originalPrice?: number;
  size?: string;
  quantity?: number;
};

type Props = {
  product: Product;
  onRemove?: (id: string) => void;
  onIncrease?: (id: string) => void;
  onDecrease?: (id: string) => void;
};

export default function CartLine({
  product,
  onRemove,
  onIncrease,
  onDecrease,
}: Props) {
  const {
    id,
    title,
    sku,
    imageSrc,
    price,
    originalPrice,
    size,
    quantity = 1,
  } = product;

  return (
    <article className="flex w-full items-center overflow-hidden border-b bg-white p-2">
      {/* Quantity Controls */}
      <div className="flex shrink-0 flex-col items-center justify-center">
        <button className="flex h-4 w-4 cursor-pointer items-center justify-center rounded text-sm">
          ▲
        </button>
        <span className="text-sm">{quantity}</span>
        <button className="flex h-4 w-4 cursor-pointer items-center justify-center rounded text-sm">
          ▼
        </button>
      </div>

      {/* Image */}
      <div className="relative ml-2 h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-50">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          sizes="56px"
        />
      </div>

      {/* TEXT AREA */}
      <div className="ml-2 min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h3 className="truncate text-[11px] leading-tight font-medium text-gray-900">
              {title}
            </h3>
            {sku && <p className="text-[10px] text-gray-500">{sku}</p>}
          </div>
        </div>

        <div className="mt-1 text-[11px] text-gray-800">
          <span className="font-semibold">TK. {price}</span>
          {originalPrice && (
            <span className="ml-1 text-gray-400 line-through">
              TK. {originalPrice}
            </span>
          )}
          {size && (
            <div className="mt-0.5 text-[10px] text-gray-500">Size: {size}</div>
          )}
        </div>
      </div>

      {/* X BUTTON — now vertically centered */}
      <button className="ml-2 shrink-0 cursor-pointer self-center text-sm text-red-500 hover:text-red-600">
        X
      </button>
    </article>
  );
}

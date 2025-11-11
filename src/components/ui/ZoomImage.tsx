import { StaticImageData } from "next/image";
import React from "react";

export default function ZoomImage({
  src,
  alt,
  zoom = 2.2,
  className = "",
  radius = "1rem",
}: {
  src: string | StaticImageData;
  alt: string;
  zoom?: number;
  className?: string;
  radius?: string;
}) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = React.useState(false); // desktop hover
  const [touching, setTouching] = React.useState(false); // mobile press
  const [bgPos, setBgPos] = React.useState("50% 50%");

  const setPositionFromPoint = (clientX: number, clientY: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    // clamp 0–100 to avoid overscroll bands
    const clamp = (v: number) => Math.max(0, Math.min(100, v));
    setBgPos(`${clamp(x)}% ${clamp(y)}%`);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    setPositionFromPoint(e.clientX, e.clientY);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouching(true);
    const t = e.touches[0];
    if (t) setPositionFromPoint(t.clientX, t.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) setPositionFromPoint(t.clientX, t.clientY);
  };

  const onTouchEnd = () => {
    setTouching(false);
  };

  const isZoomed = hovered || touching;

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      className={`/* responsive aspect ratio */ relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 md:aspect-[4/3] dark:bg-neutral-900 ${className} `}
      style={{
        borderRadius: radius,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: isZoomed ? bgPos : "center",
        backgroundSize: isZoomed ? `${zoom * 100}%` : "cover",
        transition: "background-size 150ms ease-out, transform 150ms ease-out",
        // prevents iOS rubber-band when panning inside
        touchAction: "none",
      }}
      aria-label={alt}
      role="img"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`pointer-events-none h-full w-full object-cover transition-opacity duration-150 ${
          isZoomed ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />

      {/* Optional: subtle overlay while zoomed */}
      {isZoomed && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" />
      )}
    </div>
  );
}
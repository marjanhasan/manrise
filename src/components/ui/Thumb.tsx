import { StaticImageData } from "next/image";

/** ----------------------- Thumbnail rail ----------------------- */
export default function Thumb({
  src,
  active,
  onClick,
  alt,
}: {
  src: string | StaticImageData;
  active?: boolean;
  alt: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative aspect-square w-16 overflow-hidden rounded-xl border transition ${
        active
          ? "border-black shadow-sm dark:border-white"
          : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600"
      }`}
      aria-pressed={active}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {active && (
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-black/60 dark:ring-white/70" />
      )}
    </button>
  );
}

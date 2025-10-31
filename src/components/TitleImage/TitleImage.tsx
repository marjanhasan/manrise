import { StaticImageData } from "next/image";

interface Props {
  backgroundImage: string | StaticImageData;
  title: string;
  subtitle?: string;
  textAlign?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function TitleImage({
  backgroundImage,
  title,
  subtitle,
  textAlign = "center",
  ctaText,
  ctaLink,
}: Props) {
  const bgImage =
    typeof backgroundImage === "string" ? backgroundImage : backgroundImage.src;
  return (
    <section
      className="relative flex min-h-[600px] w-full items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content Container */}
      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${textAlign}`}
      >
        <h1 className="mb-4 text-2xl font-bold text-white uppercase lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mb-4 text-base text-gray-200 lg:text-lg 2xl:text-3xl">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="mt-3 inline-block cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_10px_#00000033,0_0_20px_#00000022] sm:text-sm md:text-base"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

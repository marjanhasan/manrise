"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Banner.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Banner1 from "../../../public/banner1.png";
import Banner2 from "../../../public/banner2.png";
import Banner3 from "../../../public/banner3.png";

const banners = [
  {
    id: 1,
    image: Banner1,
    title: "Discover the Latest Trends",
    subtitle: "Elevate your lifestyle with premium products.",
    buttonText: "Shop Now",
    buttonLink: "/collections",
  },
  {
    id: 2,
    image: Banner2,
    title: "Quality You Can Trust",
    subtitle: "Experience comfort, design, and performance.",
    buttonText: "Explore More",
    buttonLink: "/collections",
  },
  {
    id: 3,
    image: Banner3,
    title: "Premium Style for Everyone",
    subtitle: "Get exclusive deals and free shipping nationwide.",
    buttonText: "Start Shopping",
    buttonLink: "/collections",
  },
];

const textAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Swiper
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="fade"
      modules={[Autoplay, Pagination, EffectFade]}
      className="heroSwiper"
      onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative aspect-[2/1] min-h-[600px] w-full">
            {/* Background Image */}
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority
              className="object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Animated Text Content */}
            <motion.div
              key={activeSlide} // ✅ triggers re-animation on slide change
              className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6"
            >
              <motion.h1
                className="text-2xl font-bold text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl"
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                {banner.title}
              </motion.h1>

              <motion.p
                className="mt-3 max-w-2xl text-sm text-gray-200 sm:text-base md:text-lg lg:text-xl"
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                custom={2}
              >
                {banner.subtitle}
              </motion.p>

              <motion.a
                href={banner.buttonLink}
                className="mt-6 inline-block cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-md transition-all duration-300 hover:scale-102 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_10px_#00000033,0_0_20px_#00000022] sm:text-sm md:text-base"
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                {banner.buttonText}
              </motion.a>
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

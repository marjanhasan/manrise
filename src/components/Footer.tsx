"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Footer() {
  return (
    <section className="border-t bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-800">
      <motion.div
        className="grid grid-cols-1 gap-8 p-8 text-center md:p-12 lg:grid-cols-3 lg:gap-12 lg:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* About */}
        <motion.div variants={fadeUp}>
          <p className="mb-6 leading-relaxed text-gray-700">
            ManRise brings you bold streetwear that speaks to individuality.
            Join THE SELF CLUB and feel the vibe of a community that celebrates
            you. It&apos;s more than fashion. It&apos;s a lifestyle. Stand out
            with ManRise!
          </p>
          <address className="mb-4 text-gray-600 not-italic">
            House-03, Road-16, Sector-11, Uttara, Dhaka, Bangladesh
            <br />
            Phone:{" "}
            <a
              className="transition-colors hover:text-gray-900"
              href="tel:01306347131"
            >
              01306-347131
            </a>
            <br />
            Email:{" "}
            <a
              className="transition-colors hover:text-gray-900"
              href="mailto:manrise2024@gmail.com"
            >
              manrise2024@gmail.com
            </a>
          </address>

          <div className="mt-4 flex justify-center gap-4 lg:justify-start">
            {[
              {
                icon: FaFacebookF,
                link: "https://facebook.com/",
                label: "Facebook",
              },
              {
                icon: FaInstagram,
                link: "https://instagram.com/",
                label: "Instagram",
              },
              {
                icon: FaWhatsapp,
                link: "https://wa.me/01306347131",
                label: "WhatsApp",
              },
            ].map(({ icon: Icon, link, label }) => (
              <a
                key={label}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-md transition-all duration-300 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_15px_#00000033,0_0_25px_#00000022]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Utility Links */}
        <motion.div variants={fadeUp} transition={{ delay: 0.2 }}>
          <h2 className="mb-4 font-semibold tracking-wide text-gray-600 uppercase">
            Utility
          </h2>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map(
              (item, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    className="relative text-gray-600 transition-colors before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-gray-900 before:transition-all hover:text-gray-900 hover:before:w-full"
                  >
                    {item}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={fadeUp} transition={{ delay: 0.4 }}>
          <h2 className="mb-2 font-semibold tracking-wide text-gray-600 uppercase">
            Unlock 15% off your first order
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive offers, and more!
          </p>
          <form className="mb-4 flex flex-col gap-2 sm:flex-row lg:justify-start">
            <input
              className="focus:ring-opacity-50 flex-1 rounded-md border border-gray-300 bg-white p-2.5 text-sm text-gray-800 placeholder-gray-400 transition-all focus:border-gray-500 focus:ring focus:ring-gray-300"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <button
              className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-md transition-all duration-300 hover:bg-gradient-to-tr hover:from-gray-700 hover:via-gray-500 hover:to-gray-700 hover:text-white hover:shadow-[0_0_10px_#00000033,0_0_20px_#00000022] sm:px-4 sm:py-2 sm:text-sm md:text-base"
              type="submit"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-gray-500">
            By clicking &quot;Subscribe&quot;, you agree to our Terms of Service
            and Privacy Policy.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom */}
      <motion.p
        className="mt-6 border-t border-gray-300 py-6 text-center text-sm text-gray-500"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        © {new Date().getFullYear()} ManRise. All rights reserved.
      </motion.p>
    </section>
  );
}

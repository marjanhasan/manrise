import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <section className="text-white">
      <div className="grid grid-cols-1 justify-center gap-4 bg-[#282828] p-6 text-center md:p-12 lg:grid-cols-3 lg:text-left">
        <div>
          <p className="mb-4">
            HYPE TOWN brings you bold streetwear that speaks to individuality.
            Join THE SELF CLUB and feel the vibe of a community that celebrates
            you. It&apos;s more than fashion. It&apos;s a lifestyle. Stand
            outwith HYPE TOWN!
          </p>
          <address>
            House-03, Road-16, Sector-11, Uttara., Dhaka, Bangladesh
            <br />
            Phone: <a href="tel:01306347131">01306-347131</a>
            <br />
            Email:{" "}
            <a href="mailto:hypetown2024@gmail.com">hypetown2024@gmail.com</a>
          </address>

          <div className="mt-4 flex justify-center gap-4 lg:justify-start">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors delay-100 duration-300 hover:bg-white hover:text-black"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors delay-100 duration-300 hover:bg-white hover:text-black"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/01306347131"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-colors delay-100 duration-300 hover:bg-white hover:text-black"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-semibold uppercase">Utility</h2>
          <ul>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-semibold uppercase">
            unlock 15% off your first order
          </h2>
          <p className="mb-2">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive offers, and more!
          </p>
          <div className="mb-2 flex flex-row justify-center gap-2 lg:justify-start">
            <input
              className="min-w-0 shrink rounded bg-white p-2 text-black"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <button
              className="rounded bg-white px-1 py-2 text-xs whitespace-nowrap text-black sm:px-2 sm:text-base"
              type="submit"
            >
              Subscribe
            </button>
          </div>
          <p>
            By clicking &quot;Subscribe&quot;, you agree to our Terms of Service
            and Privacy Policy.
          </p>
        </div>
      </div>
      <p className="mt-[1px] bg-[#282828] py-6 text-center align-middle">
        <span className="align-middle">©</span> {new Date().getFullYear()}{" "}
        HypeMan. All rights reserved.
      </p>
    </section>
  );
}

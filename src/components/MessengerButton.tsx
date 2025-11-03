"use client";
import { FaFacebookMessenger } from "react-icons/fa6";

export default function MessengerButton() {
  const handleMessengerClick = () => {
    // Replace with your actual Facebook Page Inbox link
    window.open("https://m.me/manriseofficial", "_blank");
  };

  return (
    <button
      onClick={handleMessengerClick}
      aria-label="Chat on Messenger"
      className="fixed right-[max(1rem,calc((100vw-1600px)/2+1.5rem))] bottom-20 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-blue-700 text-white shadow-[0_0_12px_#00000033,0_0_24px_#00000022] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_18px_#00000044,0_0_35px_#00000033] active:scale-95 md:bottom-5 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400"
    >
      <FaFacebookMessenger className="h-6 w-6" />
    </button>
  );
}

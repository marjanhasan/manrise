import { ButtonGroupMobile } from "@/components/ButtonGroupMobile";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MessengerButton from "@/components/MessengerButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white dark:bg-neutral-950">
      {/* Centralized container */}
      <div className="relative w-full max-w-[1600px]">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />

        {/* Floating components inside container */}
        <div className="relative">
          {/* Messenger Button anchored inside */}
          <div className="absolute">
            <MessengerButton />
          </div>

          {/* Mobile action group (optional positioning) */}
          <div className="absolute">
            <ButtonGroupMobile />
          </div>
        </div>
      </div>
    </div>
  );
}

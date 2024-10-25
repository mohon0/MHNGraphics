import Link from "next/link";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import User from "./User";

export default function Header({ fixed = false }: { fixed?: boolean }) {
  return (
    <header
      className={`${
        fixed ? "absolute" : "relative border-b"
      } top-0 z-50 flex h-14 w-full items-center transition-transform duration-500 ease-in-out`}
    >
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className={`space-x-2 font-extrabold ${
            fixed ? "text-white" : "text-black"
          }`}
        >
          <span className="text-2xl">MHN</span>
          <span className="text-xl">Graphics</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <DesktopMenu fixed={fixed} />
        </div>

        {/* Mobile Menu Icon for Smaller Screens */}
        <div className="lg:hidden">
          <MobileMenu /> {/* Render the MobileMenu component here */}
        </div>

        {/* Call to Action & Social Media for Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Call to Action Button */}
          <Link
            href="/"
            className={`space-x-2 ${fixed ? "text-white" : "text-black"}`}
          >
            Pricing
          </Link>
          <User />
        </div>
      </div>
    </header>
  );
}

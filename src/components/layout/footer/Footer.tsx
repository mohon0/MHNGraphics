"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { LuFacebook, LuGithub } from "react-icons/lu";
import { MdOutlineCopyright } from "react-icons/md";
import { SlSocialLinkedin } from "react-icons/sl";

// Social Media Links Data
const socialLinks = [
  {
    href: "https://www.facebook.com/sejarparvez",
    label: "Facebook",
    icon: <LuFacebook />,
  },
  {
    href: "https://www.twitter.com/sejarparvez",
    label: "Twitter",
    icon: <FaXTwitter />,
  },
  {
    href: "https://linkedin.com/in/sejarparvez",
    label: "LinkedIn",
    icon: <SlSocialLinkedin />,
  },
  {
    href: "https://www.github.com/sejarparvez",
    label: "GitHub",
    icon: <LuGithub />,
  },
];

export default function Footer() {
  const date = new Date();
  return (
    <div className="mx-2 mt-20 flex flex-col items-center justify-center gap-10 py-10 md:mx-10">
      <hr className="h-1 w-full bg-zinc-900" />
      <h1 className="text-primary-100 text-center text-4xl font-bold md:text-6xl">
        MHN Graphics
      </h1>
      <div className="flex gap-5 md:gap-20">
        {socialLinks.map(({ href, label, icon }) => (
          <motion.div
            key={href}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="white-bg dark:dark-bg flex h-12 w-12 items-center justify-center rounded text-muted-foreground hover:text-primary md:h-16 md:w-16"
          >
            <Link
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full items-center justify-center"
            >
              {icon}
            </Link>
          </motion.div>
        ))}
      </div>
      <p className="mx-auto flex items-center justify-center gap-2 text-center">
        <MdOutlineCopyright /> {date.getFullYear()} All rights reserved
      </p>
    </div>
  );
}

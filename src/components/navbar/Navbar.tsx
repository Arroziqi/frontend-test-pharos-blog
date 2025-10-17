"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoNavbar } from "./LogoNavbar";
import { NavItem } from "./NavItem";
import { SearchInputNavbar } from "./SearchInputNavbar";
import { ThemeModeToggle } from "./ThemeModeToggle";
import { ToggleMenu } from "@/components/navbar/ToggleMenu";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/local/posts", label: "Local" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background-navbar backdrop-blur-md rounded-b-xl">
      {/* ======= Desktop Navbar ======= */}
      <div className="hidden sm:grid grid-cols-8 mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <LogoNavbar className="col-span-2" />

        <div className="flex justify-center col-span-4 gap-4">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.href} {...link} />
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 col-span-2">
          <SearchInputNavbar />
          <ThemeModeToggle />
        </div>
      </div>

      {/* ======= Mobile Navbar ======= */}
      <div className="flex items-center justify-between sm:hidden px-4 py-3">
        <LogoNavbar />
        <div className="flex items-center gap-3">
          <SearchInputNavbar />
          <ToggleMenu onToggle={setOpen} />
        </div>
      </div>

      {/* ======= Mobile Slide Menu ======= */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-slide"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed top-[56px] left-0 w-full h-[calc(100vh-56px)] bg-background z-40 flex flex-col gap-4 sm:hidden py-7 px-3"
          >
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                {...link}
                onClick={() => setOpen(false)}
              />
            ))}

            <div className="mx-2">
              <ThemeModeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

interface NavItemProps {
  href: string;
  label: string;
  onClick?: () => void;
  withDivider?: boolean;
}

export function NavItem({
  href,
  label,
  onClick,
  withDivider = true,
}: NavItemProps) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname === href || (href === "/" && pathname === ""));
  }, [pathname, href]);

  return (
    <Link
      href={href}
      className="relative px-3 py-2 text-sm font-medium"
      onClick={onClick}
    >
      <motion.div
        className={clsx(
          "relative transition-colors duration-300 ease-in-out cursor-pointer pb-[4px]",
          isActive
            ? "text-foreground"
            : "text-foreground/80 hover:text-foreground",
        )}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Typography variant="body2">{label}</Typography>

        {withDivider && (
          <motion.span
            className="absolute left-0 bottom-0 h-[2px] bg-[color:var(--foreground)] rounded-full"
            animate={{
              width: isActive ? "100%" : isHovered ? "75%" : "0%",
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        )}
      </motion.div>
    </Link>
  );
}

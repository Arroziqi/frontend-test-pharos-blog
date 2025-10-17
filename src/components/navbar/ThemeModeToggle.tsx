"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeModeToggle({
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        backgroundColor: isDark ? "#4B6BFB" : "#E8E8EA",
      }}
      className={`relative flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${props.className}`}
      aria-label="Toggle theme"
      {...props}
    >
      <motion.div
        className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        animate={{
          x: isDark ? 24 : 2,
        }}
      >
        {isDark ? (
          <Moon size={14} className="text-[#52535F]" />
        ) : (
          <Sun size={14} className="text-[#52535F]" />
        )}
      </motion.div>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" },
          }}
          exit={{
            opacity: 0,
            y: 50,
            scale: 0.8,
            transition: { duration: 0.3, ease: "easeIn" },
          }}
          whileHover={{
            rotate: [-2, 2, 0],
            scale: 1.1,
            transition: { duration: 0.4 },
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center
                     w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg
                     hover:shadow-xl focus:outline-none"
        >
          {/* Pulse animation layer */}
          <motion.span
            className="absolute inset-0 rounded-full bg-primary/40"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <ArrowUp size={20} className="relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

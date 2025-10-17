"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ToggleMenuProps {
  onToggle?: (open: boolean) => void;
}

export function ToggleMenu({ onToggle }: ToggleMenuProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    onToggle?.(newOpen);
  };

  useEffect(() => {
    const handler = (e: CustomEvent<boolean>) => setOpen(e.detail);
    window.addEventListener("toggleMenuSync", handler as EventListener);
    return () =>
      window.removeEventListener("toggleMenuSync", handler as EventListener);
  }, []);

  return (
    <button
      className="rounded-md p-2 text-foreground sm:hidden transition-all duration-300"
      onClick={handleToggle}
      aria-label="Toggle menu"
    >
      {open ? (
        <X size={20} className="transition-transform duration-300 rotate-90" />
      ) : (
        <Menu size={20} className="transition-transform duration-300" />
      )}
    </button>
  );
}

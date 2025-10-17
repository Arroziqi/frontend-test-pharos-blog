import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function truncateText(text: string, limit = 50): string {
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
}

/**
 * A Tailwind-aware class merger.
 * Later classes override earlier ones according to Tailwind rules.
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

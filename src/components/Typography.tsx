"use client";

import { clsx } from "clsx";
import { ElementType, HTMLAttributes } from "react";

/**
 * Typography variants following the design system.
 */
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "bodyLg"
  | "bodyMd"
  | "bodySm"
  | "caption"
  | "pixie";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  /** Defines the typography variant (h1–pixie). */
  variant?: TypographyVariant;

  /** Defines the HTML element to render. Defaults to `<p>`. */
  component?: ElementType;

  /** Custom className for additional styling or overrides. */
  className?: string;
}

/**
 * Typography Component
 *
 * A versatile, responsive, and design-consistent text component.
 * Supports multiple variants, semantic HTML elements, and responsive scaling.
 */
export function Typography({
  variant = "bodyMd",
  component: Component = "p",
  className,
  children,
  ...props
}: TypographyProps) {
  /** Base typography style shared across all variants. */
  const baseStyle = "text-foreground font-sans text-[#262626]";

  /** Variant-specific responsive styles based on design tokens. */
  const variantStyles: Record<TypographyVariant, string> = {
    h1: clsx(
      "font-semibold leading-tight",
      "text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px]",
    ),
    h2: clsx(
      "font-semibold leading-snug",
      "text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px]",
    ),
    h3: clsx(
      "font-semibold leading-snug",
      "text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px]",
    ),
    h4: clsx(
      "font-medium leading-snug",
      "text-[20px] sm:text-[24px] md:text-[28px]",
    ),
    h5: clsx(
      "font-medium leading-snug",
      "text-[18px] sm:text-[20px] md:text-[22px]",
    ),
    h6: clsx(
      "font-medium leading-snug",
      "text-[16px] sm:text-[18px] md:text-[20px]",
    ),
    subtitle: clsx(
      "font-semibold leading-snug",
      "text-[12px] sm:text-[14px] md:text-[16px]",
    ),
    bodyLg: clsx(
      "font-normal leading-relaxed",
      "text-[16px] sm:text-[18px] md:text-[20px]",
    ),
    bodyMd: clsx(
      "font-normal leading-relaxed",
      "text-[14px] sm:text-[16px] md:text-[18px]",
    ),
    bodySm: clsx(
      "font-normal leading-relaxed",
      "text-[12px] sm:text-[14px] md:text-[16px]",
    ),
    caption: clsx(
      "font-medium uppercase tracking-wide",
      "text-[11px] sm:text-[12px]",
    ),
    pixie: clsx("font-normal tracking-wide", "text-[10px] sm:text-[11px]"),
  };

  return (
    <Component
      className={clsx(baseStyle, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

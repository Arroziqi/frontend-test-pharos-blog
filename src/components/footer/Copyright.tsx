"use client";

import { Typography } from "@/components/Typography";
import { cn } from "@/components/style-guide/utils";

interface CopyrightProps {
  year?: number;
  author?: string;
  className?: string;
  withDivider?: boolean;
}

export function Copyright({
  year = new Date().getFullYear(),
  author = "Ahmad Arroziqi",
  className,
  withDivider = false,
}: CopyrightProps) {
  return (
    <div className={cn("text-foreground/70 text-sm pt-4 ", className)}>
      {withDivider && <hr className="text-foreground/50 w-[45%] mb-2" />}
      <Typography
        variant="caption"
        component="p"
        className="text-foreground/60 text-xs sm:text-sm"
      >
        © {year} {author}. All rights reserved.
      </Typography>
    </div>
  );
}

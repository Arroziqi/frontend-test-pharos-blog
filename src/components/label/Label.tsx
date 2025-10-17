import React from "react";
import { colorTheme } from "@/components/style-guide/colorTheme";
import { hexToRgba } from "@/components/style-guide/utils";
import { Typography } from "@/components/Typography";

export type LabelVariants = "primary" | "secondary";

export interface LabelProps extends React.ComponentPropsWithoutRef<"div"> {
  children?: React.ReactNode;
  variant?: LabelVariants;
}

function Label({ children, variant, ...props }: LabelProps) {
  return (
    <div
      {...props}
      className={"py-1 px-[10px] rounded-[6px] w-fit"}
      style={{
        backgroundColor:
          variant === "primary"
            ? colorTheme.dark.primary
            : hexToRgba(colorTheme.dark.primary, 0.05),
      }}
    >
      <Typography
        variant={"pixie"}
        style={{
          color: variant === "primary" ? "#ffffff" : colorTheme.dark.primary,
        }}
      >
        {children}
      </Typography>
    </div>
  );
}

export default Label;

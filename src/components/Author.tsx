import React from "react";
import Link, { LinkProps } from "next/link";
import Avatar, { AvatarProps } from "@/components/Avatar";
import { Typography } from "@/components/Typography";
import { colorTheme } from "@/components/style-guide/colorTheme";

export interface AuthorProps extends Omit<LinkProps, "href"> {
  href?: string;
  avatarProps?: Omit<AvatarProps, "src" | "alt">;
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}

function Author({
  href = "#",
  src,
  alt = "Author",
  avatarProps,
  children,
  className,
  ...linkProps
}: AuthorProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 ${className}`}
      {...linkProps}
    >
      <Avatar src={src} alt={alt} {...avatarProps} />
      <Typography
        variant={"bodySm"}
        style={{ color: colorTheme.dark.secondary400 }}
      >
        {children}
      </Typography>
    </Link>
  );
}

export default Author;

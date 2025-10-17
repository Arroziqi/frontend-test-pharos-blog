import React from "react";
import Image, { ImageProps } from "next/image";

export interface AvatarProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

function Avatar({
  src = "/avatar.svg",
  alt = "Avatar",
  width = 36,
  height = 36,
  ...props
}: AvatarProps) {
  return <Image src={src} alt={alt} width={width} height={height} {...props} />;
}

export default Avatar;

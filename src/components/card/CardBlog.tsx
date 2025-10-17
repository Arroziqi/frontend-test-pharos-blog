"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Label from "@/components/label/Label";
import Author from "@/components/Author";
import { Typography } from "@/components/Typography";
import { colorTheme } from "@/components/style-guide/colorTheme";
import { truncateText } from "@/components/style-guide/utils";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface CardBlogProps extends React.ComponentPropsWithoutRef<"div"> {
  href?: string;
  imageUrl?: string;
  category?: string;
  title?: string;
  date?: string;
  description?: string;
  author?: string;
  authorImage?: string;
  authorUrl?: string;
}

export default function CardBlog({
  href,
  imageUrl,
  category,
  title,
  date,
  description,
  authorUrl,
  author,
  authorImage,
  ...props
}: CardBlogProps) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group p-4 rounded-xl flex flex-col gap-2 border border-border max-w-sm w-full mx-auto transition-all duration-500 ${props.className ?? ""}`}
    >
      {/* Image Section */}
      {imageUrl && (
        <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
          {href ? (
            <Link href={href}>
              <div className="relative w-full h-full block">
                <Image
                  src={imageUrl}
                  alt="image photo"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "scale-110 blur-sm brightness-75" : ""
                  }`}
                />

                {/* Overlay with “Read More” button */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30">
                    <Typography
                      variant="bodyMd"
                      className="text-white font-semibold tracking-wide"
                    >
                      Read More →
                    </Typography>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <Image
              src={imageUrl}
              alt="image photo"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className={`object-cover transition-all duration-500 ${
                isHovered ? "scale-110 blur-sm brightness-75" : ""
              }`}
            />
          )}
        </div>
      )}

      {/* Text Section */}
      <div className="flex flex-col gap-2">
        {category && <Label>{category}</Label>}

        {title && (
          <Typography
            variant="h4"
            component="h4"
            className="capitalize line-clamp-3"
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography variant="bodySm">{truncateText(description)}</Typography>
        )}

        <div className="flex items-center justify-between gap-2">
          {author && (
            <Author src={authorImage} href={authorUrl} alt={author}>
              {author}
            </Author>
          )}

          {date && (
            <Typography
              variant="bodySm"
              style={{ color: colorTheme.dark.secondary400 }}
            >
              {date}
            </Typography>
          )}
        </div>
      </div>
    </motion.div>
  );
}

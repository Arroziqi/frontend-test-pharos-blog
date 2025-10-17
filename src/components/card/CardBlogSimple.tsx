"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { truncateText } from "@/components/style-guide/utils";
import { SimpleBlogModal } from "@/components/modal/SimpleBlogModal";
import { Typography } from "@/components/Typography";

export interface CardBlogSimpleProps {
  id: number;
  title: string;
  userId: number;
  body: string;
  imageUrl?: string;
}

export function CardBlogSimple({
  id,
  title,
  userId,
  body,
  imageUrl,
}: CardBlogSimpleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        className="flex gap-2 p-2 border border-border rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] xl:p-3 xl:gap-3"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02 }}
      >
        {imageUrl && (
          <div className="relative w-24 h-full flex-shrink-0 rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <Typography
            variant="subtitle"
            className="font-semibold line-clamp-2 capitalize"
          >
            {title}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            User ID: {userId}
          </Typography>
          <Typography variant="bodySm" className="line-clamp-3">
            {truncateText(body, 50)}
          </Typography>
        </div>
      </motion.div>

      <SimpleBlogModal
        open={open}
        onClose={() => setOpen(false)}
        post={{ title, userId, body, imageUrl }}
      />
    </>
  );
}

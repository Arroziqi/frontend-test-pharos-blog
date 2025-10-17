"use client";

import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import Image from "next/image";
import { Typography } from "../Typography";

interface SimpleBlogModalProps {
  open: boolean;
  onClose: () => void;
  post: {
    title: string;
    userId: number;
    body: string;
    imageUrl?: string;
  };
}

export function SimpleBlogModal({ open, onClose, post }: SimpleBlogModalProps) {
  const animation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          className: "relative overflow-hidden",
        },
      }}
    >
      <motion.div
        className={"bg-background-footer p-4 xl:p-8"}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animation}
      >
        <div className="flex justify-between items-center mb-3">
          <Typography component="div" variant="h6" className={"capitalize"}>
            {post.title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {post.imageUrl && (
          <div className="relative w-full h-60 mb-3 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <Typography variant="caption" className="text-gray-500 mb-1">
          User ID: {post.userId}
        </Typography>

        <Typography variant="bodySm">{post.body}</Typography>
      </motion.div>
    </Dialog>
  );
}

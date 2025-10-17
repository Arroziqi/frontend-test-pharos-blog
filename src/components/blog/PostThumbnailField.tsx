// components/blog/PostThumbnailField.tsx
"use client";
import React from "react";
import { Box, Divider, TextField } from "@mui/material";
import { ThumbnailChangeHandler } from "@/lib/features/blog-local/domain/entity/blogLocal.entity";
import { UploadImageButton } from "@/components/button/UploadImageButton";

interface Props {
  thumbnailImage?: string;
  onChange: ThumbnailChangeHandler;
}

export function PostThumbnailField({ thumbnailImage, onChange }: Props) {
  const handleFileChange = (file: File | null) => {
    if (!file) return onChange(null);
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
      <Divider>Thumbnail Image</Divider>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <UploadImageButton onChange={handleFileChange} />

        <TextField
          fullWidth
          label="Or paste image URL"
          value={thumbnailImage ?? ""}
          onChange={(e) => onChange(e.target.value ?? "")}
        />
      </Box>

      {thumbnailImage && (
        <Box
          component="img"
          src={thumbnailImage}
          alt="Preview"
          sx={{
            mt: 2,
            width: "100%",
            maxWidth: "400px",
            borderRadius: 2,
            border: "1px solid #ccc",
          }}
        />
      )}
    </Box>
  );
}

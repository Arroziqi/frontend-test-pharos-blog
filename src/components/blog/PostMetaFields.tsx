// components/blog/PostMetaFields.tsx
"use client";
import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { category } from "@/content/category";

interface Props {
  categoryValue?: string;
  author?: string;
  errors?: { category?: string; author?: string };
  onChange: (field: "category" | "author", value: string | undefined) => void;
}

export function PostMetaFields({
  categoryValue,
  author,
  errors,
  onChange,
}: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        select
        fullWidth
        label="Category*"
        value={categoryValue ?? ""}
        onChange={(e) => onChange("category", e.target.value ?? undefined)}
        error={!!errors?.category}
        helperText={errors?.category}
      >
        {category.map((cat) => (
          <MenuItem key={cat.slug} value={cat.slug}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Author*"
        value={author ?? ""}
        onChange={(e) => onChange("author", e.target.value ?? undefined)}
        error={!!errors?.author}
        helperText={errors?.author}
      />
    </Box>
  );
}

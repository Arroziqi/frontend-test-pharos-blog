// components/blog/PostTitleFields.tsx
"use client";
import React from "react";
import { TextField } from "@mui/material";

interface Props {
  title?: string; // accept undefined
  slug?: string;
  error?: string;
  onChange: (field: "title", value: string | undefined) => void;
}

export function PostTitleFields({ title, slug, error, onChange }: Props) {
  return (
    <>
      <TextField
        fullWidth
        label="Title*"
        value={title ?? ""}
        onChange={(e) => onChange("title", e.target.value ?? undefined)}
        error={!!error}
        helperText={error}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Slug"
        value={slug ?? ""}
        disabled
        sx={{ mb: 3 }}
      />
    </>
  );
}

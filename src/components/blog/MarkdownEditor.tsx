// components/blog/MarkdownEditor.tsx
"use client";
import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface Props {
  value?: string;
  error?: string;
  onChange: (value: string | undefined) => void;
}

export function MarkdownEditor({ value, error, onChange }: Props) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
        minHeight: "400px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" mb={1}>
          Markdown Content*
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={15}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value ?? undefined)}
          placeholder="Write your markdown here..."
          error={!!error}
          helperText={error}
        />
      </Box>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="subtitle1" mb={1}>
          Live Preview
        </Typography>
        <Box
          sx={{
            fontSize: "0.95rem",
            "& h1": { fontSize: "1.5rem", fontWeight: "bold" },
            "& h2": { fontSize: "1.3rem", fontWeight: "bold" },
            "& pre": (theme) => ({
              backgroundColor:
                theme.palette.mode === "dark" ? "#272822" : "#f4f4f4",
              padding: "8px",
              borderRadius: "4px",
              overflowX: "auto",
            }),
          }}
        >
          {value?.trim() ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Start typing markdown to see the preview here.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

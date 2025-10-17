import React from "react";
import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export function UploadImageButton({
  onChange,
}: {
  onChange: (file: File | null) => void;
}) {
  const handleFileChange = (file: File | null) => {
    onChange(file);
  };

  return (
    <Button
      variant="outlined"
      component="label"
      sx={{
        minWidth: 40,
        width: 40,
        height: 40,
        borderRadius: "50%",
        p: 0,
      }}
    >
      <UploadIcon fontSize="small" />
      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
      />
    </Button>
  );
}

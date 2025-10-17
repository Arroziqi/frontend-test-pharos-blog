"use client";

import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNewLocalPostForm } from "@/hooks/blog/useNewLocalPostForm";
import { PostTitleFields } from "@/components/blog/PostTitleFields";
import { PostMetaFields } from "@/components/blog/PostMetaFields";
import { PostThumbnailField } from "@/components/blog/PostThumbnailField";
import { MarkdownEditor } from "@/components/blog/MarkdownEditor";

export default function NewLocalPostPage() {
  const { form, errors, handleChange, handleSubmit, handleThumbnailChange } =
    useNewLocalPostForm();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Create New Local Post
      </Typography>

      <form onSubmit={handleSubmit}>
        <PostTitleFields
          title={form.title}
          slug={form.slug}
          error={errors.title}
          onChange={handleChange}
        />

        <PostMetaFields
          categoryValue={form.category}
          author={form.author}
          errors={errors}
          onChange={handleChange}
        />

        <PostThumbnailField
          thumbnailImage={form.thumbnailImage}
          onChange={handleThumbnailChange}
        />

        <MarkdownEditor
          value={form.body}
          error={errors.body}
          onChange={(value) => handleChange("body", value)}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button type="submit" variant="contained">
            Save Post
          </Button>
        </Box>
      </form>
    </Box>
  );
}

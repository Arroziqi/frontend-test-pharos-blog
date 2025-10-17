"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useBlogLocal } from "./useBlogLocal";
import {
  BlogFormState,
  BlogLocalEntity,
} from "@/lib/features/blog-local/domain/entity/blogLocal.entity";

export function useNewLocalPostForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { createBlog } = useBlogLocal();

  const [form, setForm] = React.useState<BlogFormState>({
    title: "",
    slug: "",
    body: "",
    category: "",
    thumbnailImage: "",
    author: "",
    authorImage: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleChange = (
    field: keyof BlogLocalEntity,
    value: string | undefined,
  ) => {
    setForm((prev) => {
      if (field === "title") {
        const slug =
          (value ?? "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") || prev.slug;
        return { ...prev, title: value, slug };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleThumbnailChange = (fileOrUrl: string | File | null) => {
    if (!fileOrUrl)
      return setForm((prev) => ({ ...prev, thumbnailImage: undefined }));
    if (typeof fileOrUrl === "string")
      return setForm((prev) => ({ ...prev, thumbnailImage: fileOrUrl }));

    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, thumbnailImage: reader.result as string }));
    reader.readAsDataURL(fileOrUrl);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title?.trim()) newErrors.title = "Title is required.";
    else if ((form.title ?? "").length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    else if (!/^[A-Za-z]/.test(form.title ?? ""))
      newErrors.title = "Title must start with a letter.";

    if (!form.body?.trim()) newErrors.body = "Content is required.";
    else if ((form.body ?? "").length < 20)
      newErrors.body = "Content must be at least 20 characters.";

    if (!form.category?.trim()) newErrors.category = "Category is required.";
    if (!form.author?.trim()) newErrors.author = "Author name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      enqueueSnackbar("Please fix validation errors.", { variant: "error" });
      return;
    }

    try {
      await createBlog({
        title: form.title!,
        slug: form.slug,
        body: form.body!,
        category: form.category ?? "general",
        author: form.author ?? "Unknown",
        authorImage: form.authorImage,
        thumbnailImage: form.thumbnailImage,
      });
      enqueueSnackbar("Post created successfully!", { variant: "success" });
      router.push("/local/posts");
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to create post.", { variant: "error" });
    }
  };

  return { form, errors, handleChange, handleThumbnailChange, handleSubmit };
}

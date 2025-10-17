"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBlogLocal } from "./useBlogLocal";
import { BlogLocalEntity } from "@/lib/features/blog-local/domain/entity/blogLocal.entity";
import { useSnackbar } from "notistack";

export function usePostDetail() {
  const router = useRouter();
  const params = useParams<{ ID: string }>();
  const { fetchBlogs, getBlogById, deleteBlog, loading } = useBlogLocal();
  const { enqueueSnackbar } = useSnackbar();

  const [post, setPost] = useState<BlogLocalEntity | null>(null);

  /** Fetch blog by ID on mount */
  useEffect(() => {
    const loadPost = async () => {
      await fetchBlogs();
      if (params.ID) {
        const p = await getBlogById(params.ID);
        setPost(p);
      }
    };
    loadPost();
  }, [params.ID, fetchBlogs, getBlogById]);

  const handleDelete = useCallback(async () => {
    if (!post) return;

    try {
      const success = await deleteBlog(post.id);
      if (success) {
        enqueueSnackbar("Post deleted successfully!", { variant: "success" });
        router.push("/local/posts");
      } else {
        enqueueSnackbar("Failed to delete post.", { variant: "error" });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Error deleting post.", { variant: "error" });
    }
  }, [post, deleteBlog, enqueueSnackbar, router]);

  return { post, loading, handleDelete };
}

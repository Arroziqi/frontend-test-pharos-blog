"use client";

import { atom, useAtom } from "jotai";
import { useCallback, useEffect, useRef } from "react";
import { BlogLocalEntity } from "@/lib/features/blog-local/domain/entity/blogLocal.entity";
import { BlogLocalPersistence } from "@/lib/features/blog-local/adapter/persistence/blog.local.persistence";
import { GetAllBlogLocalUseCase } from "@/lib/features/blog-local/application/usecase/getAllBlogLocal.usecase";
import { GetBlogLocalByIdUseCase } from "@/lib/features/blog-local/application/usecase/getBlogLocalById.usecase";
import { CreateBlogLocalUseCase } from "@/lib/features/blog-local/application/usecase/createBlogLocal.usecase";
import { UpdateBlogLocalUseCase } from "@/lib/features/blog-local/application/usecase/updateBlogLocal.usecase";
import { DeleteBlogLocalUseCase } from "@/lib/features/blog-local/application/usecase/deleteBlogLocal.usecase";
import { ClearBlogLocalUseCase } from "@/lib/features/blog-local/application/usecase/clearBlogLocal.usecase";

/** --- Atoms --- */
const blogsAtom = atom<BlogLocalEntity[]>([]);
const loadingAtom = atom<boolean>(false);
const errorAtom = atom<string | null>(null);

/** --- Persistence & UseCases --- */
const repo = new BlogLocalPersistence();
const getAllUseCase = new GetAllBlogLocalUseCase(repo);
const getByIdUseCase = new GetBlogLocalByIdUseCase(repo);
const createUseCase = new CreateBlogLocalUseCase(repo);
const updateUseCase = new UpdateBlogLocalUseCase(repo);
const deleteUseCase = new DeleteBlogLocalUseCase(repo);
const clearUseCase = new ClearBlogLocalUseCase(repo);

/** --- Hook --- */
export function useBlogLocal() {
  const [blogs, setBlogs] = useAtom(blogsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

  const cache = useRef<BlogLocalEntity[] | null>(null);

  /** Fetch all blogs */
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      if (cache.current) {
        setBlogs(cache.current);
        return cache.current;
      }
      const data = await getAllUseCase.execute();
      setBlogs(data);
      cache.current = data;
      return data;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch blogs.");
      return [];
    } finally {
      setLoading(false);
    }
  }, [setBlogs, setLoading, setError]);

  /** Get blog by id */
  const getBlogById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const cached = cache.current?.find((b) => b.id === id);
        if (cached) return cached;

        const blog = await getByIdUseCase.execute(id);
        return blog;
      } catch (err) {
        console.error(err);
        setError("Failed to get blog by ID.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError],
  );

  /** Create new blog */
  const createBlog = useCallback(
    async (data: Omit<BlogLocalEntity, "id" | "createdAt">) => {
      try {
        setLoading(true);
        const newBlog = await createUseCase.execute(data);
        const updated = [...blogs, newBlog];
        setBlogs(updated);
        cache.current = updated;
        return newBlog;
      } catch (err) {
        console.error(err);
        setError("Failed to create blog.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [blogs, setBlogs, setLoading, setError],
  );

  /** Update blog */
  const updateBlog = useCallback(
    async (
      id: string,
      data: Partial<Omit<BlogLocalEntity, "id" | "createdAt">>,
    ) => {
      try {
        setLoading(true);
        const updated = await updateUseCase.execute(id, data);
        if (updated) {
          const newState = blogs.map((b) => (b.id === id ? updated : b));
          setBlogs(newState);
          cache.current = newState;
        }
        return updated;
      } catch (err) {
        console.error(err);
        setError("Failed to update blog.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [blogs, setBlogs, setLoading, setError],
  );

  /** Delete blog */
  const deleteBlog = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const success = await deleteUseCase.execute(id);
        if (success) {
          const newState = blogs.filter((b) => b.id !== id);
          setBlogs(newState);
          cache.current = newState;
        }
        return success;
      } catch (err) {
        console.error(err);
        setError("Failed to delete blog.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [blogs, setBlogs, setLoading, setError],
  );

  /** Clear all blogs */
  const clearBlogs = useCallback(async () => {
    try {
      setLoading(true);
      await clearUseCase.execute();
      setBlogs([]);
      cache.current = [];
    } catch (err) {
      console.error(err);
      setError("Failed to clear blogs.");
    } finally {
      setLoading(false);
    }
  }, [setBlogs, setLoading, setError]);

  /** Load blogs initially */
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    clearBlogs,
  };
}

import { BlogLocalEntity } from "../../domain/entity/blogLocal.entity";
import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";
import {
  ensureValidCreatedAt,
  generateSlug,
  generateUUID,
  getCurrentIsoDate,
} from "@/lib/common/utils";
import { localConfig } from "@/lib/common/config/localConfig";
import { LocalStorage } from "@/lib/common/local/localStorage";

/**
 * Persistence layer implementation for BlogLocalRepository.
 * This class acts as a local storage-based data source.
 */
export class BlogLocalPersistence implements BlogLocalRepository {
  private storageKey: string;

  constructor() {
    // Fallback key to ensure storage always works even if env is missing
    this.storageKey = localConfig.storageKey.blog || "local_blog_posts";
  }

  async getAll(): Promise<BlogLocalEntity[]> {
    return LocalStorage.read<BlogLocalEntity>(this.storageKey);
  }

  async getById(id: string): Promise<BlogLocalEntity | null> {
    const blogs = LocalStorage.read<BlogLocalEntity>(this.storageKey);
    return blogs.find((b) => b.id === id) || null;
  }

  async create(
    data: Omit<BlogLocalEntity, "id" | "createdAt">,
  ): Promise<BlogLocalEntity> {
    const blogs = LocalStorage.read<BlogLocalEntity>(this.storageKey);

    const newBlog: BlogLocalEntity = {
      ...data,
      id: generateUUID(),
      slug: data.slug ?? generateSlug(data.title),
      createdAt: getCurrentIsoDate(),
    };

    blogs.push(newBlog);
    LocalStorage.write(this.storageKey, blogs);

    return newBlog;
  }

  async update(
    id: string,
    data: Partial<Omit<BlogLocalEntity, "id" | "createdAt">>,
  ): Promise<BlogLocalEntity | null> {
    const blogs = LocalStorage.read<BlogLocalEntity>(this.storageKey);
    const index = blogs.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const updated: BlogLocalEntity = {
      ...blogs[index],
      ...data,
      slug: data.title
        ? generateSlug(data.title)
        : (blogs[index].slug ?? generateSlug(blogs[index].title)),
      createdAt: ensureValidCreatedAt(blogs[index].createdAt),
    };

    blogs[index] = updated;
    LocalStorage.write(this.storageKey, blogs);

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const blogs = LocalStorage.read<BlogLocalEntity>(this.storageKey);
    const filtered = blogs.filter((b) => b.id !== id);
    if (filtered.length === blogs.length) return false;

    LocalStorage.write(this.storageKey, filtered);
    return true;
  }

  async clear(): Promise<void> {
    LocalStorage.clear(this.storageKey);
  }
}

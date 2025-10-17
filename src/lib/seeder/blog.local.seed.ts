import {
  generateSlug,
  generateUUID,
  getCurrentIsoDate,
} from "@/lib/common/utils";
import { localConfig } from "@/lib/common/config/localConfig";
import { LocalStorage } from "@/lib/common/local/localStorage";
import { BlogLocalEntity } from "@/lib/features/blog-local/domain/entity/blogLocal.entity";

/**
 * Seed local storage with 5 dummy blog posts if not already present.
 */
export function seedBlogLocalData() {
  if (typeof window === "undefined") return;

  const key = localConfig.storageKey.blog ?? "local_blog_posts";
  const existing = LocalStorage.read<BlogLocalEntity>(key);

  if (existing.length > 0) {
    console.info("✅ BlogLocal seed skipped — data already exists");
    return;
  }

  const dummyData: BlogLocalEntity[] = Array.from({ length: 5 }).map((_, i) => {
    const title = `Sample Blog Post ${i + 1}`;
    return {
      id: generateUUID(),
      title,
      slug: generateSlug(title),
      body: `This is a sample blog post number ${i + 1}. It contains placeholder text for testing local storage persistence.`,
      category: i % 2 === 0 ? "technology" : "lifestyle",
      thumbnailImage: "/placeholder/placeholder.svg",
      author: `User ${i + 1}`,
      authorImage: "/placeholder/avatar.svg",
      createdAt: getCurrentIsoDate(),
    };
  });

  LocalStorage.write(key, dummyData);
  console.info("✅ BlogLocal seed completed with 5 dummy posts");
}

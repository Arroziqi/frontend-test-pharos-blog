"use client";

import { Typography } from "@mui/material";
import type { BlogLocalEntity } from "@/lib/features/blog-local/domain/entity/blogLocal.entity";
import CardBlog from "@/components/card/CardBlog";

interface Props {
  posts: BlogLocalEntity[];
}

export function LatestPosts({ posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h6" className="font-semibold mb-2">
        Latest Posts
      </Typography>
      <div className="flex gap-4 overflow-x-auto py-2">
        {posts.map((post) => (
          <CardBlog
            key={post.id}
            href={`/local/posts/${post.id}`}
            title={post.title}
            category={post.category}
            date={new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            author={post.author}
            description={post.body}
            imageUrl={post.thumbnailImage ?? "/placeholder/placeholder2.svg"}
            className="min-w-[250px] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

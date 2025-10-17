"use client";

import { useState } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { usePostDetail } from "@/hooks/blog/usePostDetail";
import { PostDetailContent } from "@/components/blog/PostDetailContent";
import { ConfirmDeleteDialog } from "@/components/dialog/ConfirmDeleteDialog";
import { AboutAuthor } from "@/components/AboutAuthor";
import { LatestPosts } from "@/components/blog/LatestPosts";
import { profile } from "@/content/profile";
import { useBlogLocal } from "@/hooks/blog/useBlogLocal";
import MainContainer from "@/components/container/MainContainer";

export default function PostDetailPage() {
  const router = useRouter();
  const { post, loading, handleDelete } = usePostDetail();
  const [openConfirm, setOpenConfirm] = useState(false);
  const { blogs } = useBlogLocal();

  if (loading && !post) {
    return (
      <div className="p-6 text-center">
        <Typography variant="body1">Loading post...</Typography>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6 text-center">
        <Typography variant="h6">Post not found</Typography>
        <button onClick={() => router.push("/local/posts")}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <MainContainer className="grid grid-cols-1 gap-6 p-4 xl:grid-cols-3 xl:gao-1">
        {/* Post content */}
        <div className="xl:col-span-2">
          <PostDetailContent
            post={post}
            onBack={() => router.push("/local/posts")}
            onDelete={() => setOpenConfirm(true)}
          />
        </div>

        {/* Right sidebar: About author + latest posts */}
        <div className="flex flex-col gap-6 ">
          <AboutAuthor
            name={post.author ?? profile.name}
            role={profile.role}
            avatar={profile.avatar}
            bio={profile.bio}
            socials={profile.socials}
            location={profile.location}
          />

          <LatestPosts
            posts={blogs
              .filter((b) => b.id !== post.id)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 5)}
          />
        </div>
      </MainContainer>

      <ConfirmDeleteDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
        postTitle={post.title}
      />
    </>
  );
}

"use client";

import CardHero from "@/components/card/CardHero";
import MainContainer from "@/components/container/MainContainer";
import { Typography } from "@/components/Typography";
import { useJsonPlaceholders } from "@/hooks/jsonPlaceholder/useJsonPlaceholders";
import { CardBlogSimple } from "@/components/card/CardBlogSimple";

export default function Home() {
  const {
    jsonPlaceholders: posts,
    loading: loadingPosts,
    error: errorPosts,
  } = useJsonPlaceholders(11);

  return (
    <>
      <CardHero
        title={
          "The Impact of Technology on the Workplace: How Technology is Changing"
        }
        category={"technology"}
        description={
          "Exploring how technology is transforming the way we work and interact in modern workplaces."
        }
        date={"2021-01-01"}
        author={"Ahmad Arroziqi"}
        imageUrl={"/placeholder/placeholder.svg"}
      />

      <MainContainer>
        <Typography variant={"h3"} className="mb-4">
          Latest Post
        </Typography>

        {loadingPosts && (
          <Typography variant="bodyMd">Loading posts...</Typography>
        )}
        {errorPosts && (
          <Typography variant="bodyMd" className="text-red-500">
            Failed to load posts.
          </Typography>
        )}

        <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 xl:gap-4">
          {!loadingPosts &&
            !errorPosts &&
            posts.map((post) => (
              <CardBlogSimple
                key={post.id}
                id={post.id}
                title={post.title}
                userId={post.userId}
                body={post.body}
                imageUrl={"/placeholder/placeholder2.svg"}
              />
            ))}
        </div>
      </MainContainer>
    </>
  );
}
